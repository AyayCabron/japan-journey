import json

from js import Object, fetch


class SupabaseClient:
    def __init__(
        self,
        url: str,
        publishable_key: str,
    ):
        self.url = url.rstrip("/")
        self.publishable_key = publishable_key

    def _headers(
        self,
        access_token: str,
        content_type: bool = False,
        prefer: str | None = None,
    ):
        values = [
            ["apikey", self.publishable_key],
            ["Authorization", f"Bearer {access_token}"],
            ["Accept", "application/json"],
        ]

        if content_type:
            values.append(["Content-Type", "application/json"])

        if prefer:
            values.append(["Prefer", prefer])

        return Object.fromEntries(values)

    async def get(
        self,
        path: str,
        access_token: str,
    ):
        response = await fetch(
            f"{self.url}{path}",
            {
                "method": "GET",
                "headers": self._headers(access_token),
            },
        )

        return await self._parse_response(response)

    async def post(
        self,
        path: str,
        access_token: str,
        payload: dict,
    ):
        response = await fetch(
            f"{self.url}{path}",
            {
                "method": "POST",
                "headers": self._headers(
                    access_token,
                    content_type=True,
                    prefer="return=representation",
                ),
                "body": json.dumps(payload),
            },
        )

        return await self._parse_response(response)

    async def _parse_response(self, response):
        body = await response.text()

        if not body:
            return response.status, None

        return response.status, json.loads(body)