from modules.health.controller import health


def register(router):
    router.get(
        "/api/v1/health",
        health,
    )