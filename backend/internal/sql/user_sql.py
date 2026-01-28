from fastapi import HTTPException
from sqlalchemy import or_
from sqlalchemy.exc import IntegrityError
from sqlmodel import select
from backend.internal.database import AsyncSession
from backend.internal.models.users import User, UserCreate, UserUpdate, UserLogin
from backend.internal.security.password import get_password_hash, verify_password


async def get_user_by_email_or_username(session: AsyncSession, email: str = None, username: str = None):
    if not username and not email:
        return None
    conditions = []
    if username:
        conditions.append(User.username == username)
    if email:
        conditions.append(User.email == email)
    query = select(User).where(User.is_deleted == False, or_(*conditions))
    result = await session.execute(query)
    return result.scalars().one_or_none()


async def get_user_by_id(session: AsyncSession, user_id: int):
    query = select(User).where(User.id == user_id)
    result = await session.execute(query)
    if not result:
        raise HTTPException(status_code=404, detail="User not found")
    return result.scalars().one_or_none()


async def create_user(session: AsyncSession, user: UserCreate):
    hashed_password = get_password_hash(user.password)
    user_to_db = User(**user.model_dump(exclude={"password"}), hashed_password=hashed_password)
    session.add(user_to_db)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=409, detail="User already exists")
    await session.refresh(user_to_db)
    return user_to_db


async def login_user(session: AsyncSession, user_data: UserLogin):
    user = await get_user_by_email_or_username(session, user_data.username, user_data.username)
    if not user:
        raise HTTPException(status_code=401, detail="User does not exist")
    if not verify_password(user_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Incorrect login or password", headers={"WWW-Authenticate": "Bearer"})
    return user


async def update_user(session: AsyncSession, user_data: UserUpdate, user_id: int):
    user_in_db = await get_user_by_id(session, user_id)
    if not user_in_db:
        raise HTTPException(status_code=404, detail="User does not exist")
    update_data = user_data.model_dump(exclude_unset=True)
    if "password" in update_data:
        password = update_data.pop("password")
        user_in_db.hashed_password = get_password_hash(password)
    for key, value in update_data.items():
        setattr(user_in_db, key, value)
    session.add(user_in_db)
    try:
        await session.commit()
    except IntegrityError:
        await session.rollback()
        raise HTTPException(status_code=409, detail="User with this data already exists")
    return user_in_db


async def delete_user(session: AsyncSession, user_id: int):
    user_to_delete = await get_user_by_id(session, user_id)
    if not user_to_delete:
        raise HTTPException(status_code=404, detail="User does not exist")
    user_to_delete.is_deleted = True
    await session.commit()
    return user_to_delete
