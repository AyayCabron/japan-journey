from dataclasses import dataclass
from typing import Awaitable, Callable

from router.request import get_path
from router.response import internal_error, no_content, not_found


Handler = Callable[..., Awaitable]


@dataclass
class Route:
    method: str
    path: str
    handler: Handler


class Router:
    def __init__(self):
        self.routes: list[Route] = []

    def add(
        self,
        method: str,
        path: str,
        handler: Handler,
    ):
        self.routes.append(
            Route(
                method=method.upper(),
                path=path,
                handler=handler,
            )
        )

    def get(self, path: str, handler: Handler):
        self.add("GET", path, handler)

    def post(self, path: str, handler: Handler):
        self.add("POST", path, handler)

    def patch(self, path: str, handler: Handler):
        self.add("PATCH", path, handler)

    def delete(self, path: str, handler: Handler):
        self.add("DELETE", path, handler)

    async def dispatch(self, request, env):
        if request.method == "OPTIONS":
            return no_content()

        path = get_path(request)

        for route in self.routes:
            if (
                route.method == request.method
                and route.path == path
            ):
                try:
                    return await route.handler(request, env)
                except Exception as exc:
                    print(
                        f"Unhandled error "
                        f"{request.method} {path}: "
                        f"{type(exc).__name__}: {exc}"
                    )

                    return internal_error()

        return not_found()