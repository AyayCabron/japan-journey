from datetime import datetime, timezone

from router.response import success


async def health(request, env, params):
    return success(
        {
            "service": "japan-journey-api",
            "status": "ok",
            "environment": "development",
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
    )
