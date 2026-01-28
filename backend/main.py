from fastapi import FastAPI
from sqlmodel import SQLModel
from starlette.middleware.cors import CORSMiddleware

from backend.application.handlers.users import user_router
from backend.application.handlers.music import music_router
from backend.internal.database import async_engine

app = FastAPI(title="MusicMigration")
app.include_router(user_router)
app.include_router(music_router)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
    "http://localhost:5173",
    "http://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
    max_age=3600,
)



@app.on_event("startup")
async def startup():
    print("Creating database tables...")
    async with async_engine.begin() as conn:
        await conn.run_sync(SQLModel.metadata.create_all)
    print("Database tables created!")


@app.get("/")
async def root():
    return "Hello Mutherfucka"
