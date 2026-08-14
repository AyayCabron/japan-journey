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

    def _match(
        self,
        route_path: str,
        request_path: str,
    ) -> dict[str, str] | None:
        route_parts = route_path.strip("/").split("/")
        request_parts = request_path.strip("/").split("/")

        if len(route_parts) != len(request_parts):
            return None

        params: dict[str, str] = {}

        for route_part, request_part in zip(
            route_parts,
            request_parts,
        ):
            if (
                route_part.startswith("{")
                and route_part.endswith("}")
            ):
                name = route_part[1:-1]
                params[name] = request_part
                continue

            if route_part != request_part:
                return None

        return params

    async def dispatch(self, request, env):
        if request.method == "OPTIONS":
            return no_content()

        path = get_path(request)

        for route in self.routes:
            if route.method != request.method:
                continue

            params = self._match(route.path, path)

            if params is None:
                continue

            try:
                return await route.handler(
                    request,
                    env,
                    params,
                )
            except Exception as exc:
                print(
                    f"Unhandled error "
                    f"{request.method} {path}: "
                    f"{type(exc).__name__}: {exc}"
                )

                return internal_error()

        return not_found()
