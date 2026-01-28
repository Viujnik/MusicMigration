import os
from dotenv import load_dotenv
from fastapi import APIRouter, UploadFile
import io
from yandex_music import Client

load_dotenv()
client = Client(os.getenv("TOKEN")).init()

music_router = APIRouter(tags=["music"])


@music_router.post("/upload")
def upload_music(file: UploadFile):
    file_stream = io.TextIOWrapper(file.file, encoding="utf-8")
    tracks_id = []
    for line in file_stream:
        query = line.strip()
        if not query:
            continue
        search_result = client.search(query).best
        if search_result and search_result.type == "track":
            tracks_id.append(search_result.result.id)
    if tracks_id:
        success = client.users_likes_tracks_add(track_ids=tracks_id)
        return {"status": success, "count": len(tracks_id), "ids": tracks_id}
    return {"status": False, "count": 0, "ids": []}
