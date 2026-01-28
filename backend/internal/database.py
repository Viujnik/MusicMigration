import os

from dotenv import load_dotenv
from fastapi import Depends
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.sql.annotation import Annotated
from sqlmodel import SQLModel
load_dotenv()
DATABASE_URL = os.environ.get("DATABASE_URL")
async_engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSession = async_sessionmaker(bind=async_engine, expire_on_commit=False, class_=AsyncSession, autoflush=False, autocommit=False)

async def create_db_and_tables():
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)

async def get_async_session():
    async with AsyncSession() as session:
        yield session

AsyncSessionDep = Annotated[AsyncSession, Depends(get_async_session)]