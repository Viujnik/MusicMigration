from fastapi import APIRouter, Depends

from backend.internal.database import get_async_session
from backend.internal.models.tokens import Token
from backend.internal.models.users import UserCreate, UserPublic, UserUpdate, UserLogin
from backend.internal.security.jwt_tokens import create_tokens
from backend.internal.sql import user_sql as user_crud

user_router = APIRouter(prefix="/users", tags=["users"])

@user_router.post("/register", response_model=UserPublic)
async def register_user(user: UserCreate, session = Depends(get_async_session)):
    user_to_db = await user_crud.create_user(session, user)
    return user_to_db


@user_router.post("/login", response_model=Token)
async def login_user(user: UserLogin, session = Depends(get_async_session)):
    db_user = await user_crud.login_user(session, user)
    tokens = create_tokens(db_user.id)
    return tokens


@user_router.patch("/{user_id}", response_model=UserPublic)
async def update_user(user_id: int, user: UserUpdate, session = Depends(get_async_session)):
    updated_user = await user_crud.update_user(session, user, user_id)
    return updated_user

@user_router.delete("/{user_id}", response_model=UserPublic)
async def delete_user(user_id: int, session = Depends(get_async_session)):
    deleted_user = await user_crud.delete_user(session, user_id)
    return deleted_user

@user_router.get("/{user_id}", response_model=UserPublic)
async def get_user_by_id(user_id: int, session = Depends(get_async_session)):
    user = await user_crud.get_user_by_id(session, user_id)
    return user

