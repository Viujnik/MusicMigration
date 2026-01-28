from fastapi import FastAPI
from sqlmodel import SQLModel

from backend.application.handlers.users import router
from backend.internal.database import async_engine

app = FastAPI(title="MusicMigration")
app.include_router(router)

@app.on_event("startup")
async def startup():
    print("Creating database tables...")
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Database tables created!")

@app.get("/")
async def root():
    return "Hello Mutherfucka"