import json
from urllib.parse import parse_qs, urlparse


def get_path(request) -> str:
    return urlparse(request.url).path


def get_query_params(request) -> dict[str, str]:
    parsed = urlparse(request.url)
    values = parse_qs(parsed.query)

    return {
        key: items[0]
        for key, items in values.items()
        if items
    }


def get_bearer_token(request) -> str | None:
    authorization = request.headers.get("Authorization")

    if not authorization:
        return None

    scheme, separator, token = authorization.partition(" ")

    if separator != " " or scheme.lower() != "bearer":
        return None

    token = token.strip()

    return token or None


async def get_json(request) -> dict:
    body = await request.text()

    if not body:
        return {}

    return json.loads(body)
