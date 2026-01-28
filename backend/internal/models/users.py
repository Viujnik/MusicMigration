from datetime import datetime

from pydantic import EmailStr
from sqlalchemy import Column, func, DateTime
from sqlmodel import SQLModel, Field


class UserBase(SQLModel):
    username: str = Field(index=True, unique=True)
    age: int = Field(index=True)
    email: EmailStr = Field(index=True, unique=True)


class UserPublic(UserBase):
    id: int


class User(UserBase, table=True):
    id: int | None = Field(primary_key=True, default=None)
    hashed_password: str
    created_at: datetime = Field(sa_column=Column(DateTime, server_default=func.now()))
    updated_at: datetime = Field(sa_column=Column(DateTime, server_default=func.now(), onupdate=func.now()))
    is_deleted: bool = Field(default=False)


class UserCreate(UserBase):
    password: str

class UserLogin(SQLModel):
    username: str
    password: str


class UserUpdate(SQLModel):
    username: str | None = None
    age: int | None = None
    email: EmailStr | None = None
    password: str | None = None
