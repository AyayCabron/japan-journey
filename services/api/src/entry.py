import json
from datetime import datetime, timezone

from workers import Request, Response, WorkerEntrypoint


def json_response(data: dict, status: int = 200) -> Response:
    return Response(
        json.dumps(data),
        status=status,
        headers={
            "content-type": "application/json; charset=utf-8",
            "access-control-allow-origin": "http://localhost:5173",
        },
    )


class Default(WorkerEntrypoint):
    async def fetch(self, request: Request) -> Response:
        path = request.url.split("?", 1)[0]

        if request.method == "GET" and path.endswith("/api/v1/health"):
            return json_response(
                {
                    "data": {
                        "service": "japan-journey-api",
                        "status": "ok",
                        "environment": "development",
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    }
                }
            )

        return json_response(
            {
                "error": {
                    "code": "RESOURCE_NOT_FOUND",
                    "message": "Resource not found",
                }
            },
            status=404,
        )
