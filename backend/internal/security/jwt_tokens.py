import os
from datetime import datetime, timedelta

import jwt
from dotenv import load_dotenv

load_dotenv()
SECRET_KEY = os.getenv('SECRET_KEY')
ALGORITHM = os.getenv('ALGORITHM')
ACCESS_TOKEN_EXPIRE_MINUTES = os.getenv('ACCESS_TOKEN_EXPIRE_MINUTES')
REFRESH_TOKEN_EXPIRE_DAYS = os.getenv('REFRESH_TOKEN_EXPIRE_DAYS')

def create_tokens(user_id: int) -> dict:
    now = datetime.now()

    access_expire = now + timedelta(minutes=float(ACCESS_TOKEN_EXPIRE_MINUTES))
    access_payload = {"sub": str(user_id), "exp": access_expire, "type": "access"}
    access_token = jwt.encode(access_payload, SECRET_KEY, algorithm=ALGORITHM)

    refresh_expire = now + timedelta(days=float(REFRESH_TOKEN_EXPIRE_DAYS))
    refresh_payload = {"sub": str(user_id), "exp": refresh_expire, "type": "refresh"}
    refresh_token = jwt.encode(refresh_payload, SECRET_KEY, algorithm=ALGORITHM)

    return {"access_token": access_token, "refresh_token": refresh_token, "token_type": "bearer"}

def decode_token(token: str, expected_type: str = "access") -> int | None:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=ALGORITHM)
        if payload.get("type") != expected_type:
            return None
        return int(payload.get("sub"))
    except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
        return None