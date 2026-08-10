import json

from workers import Response


CORS_HEADERS = {
    "access-control-allow-origin": "http://localhost:5173",
    "access-control-allow-methods": "GET, POST, PATCH, DELETE, OPTIONS",
    "access-control-allow-headers": "authorization, content-type, accept, apikey",
    "access-control-max-age": "86400",
}


def json_response(data, status: int = 200) -> Response:
    headers = {
        **CORS_HEADERS,
        "content-type": "application/json; charset=utf-8",
    }

    return Response(
        json.dumps(data),
        status=status,
        headers=headers,
    )


def success(data, status: int = 200) -> Response:
    return json_response(
        {
            "data": data,
        },
        status,
    )


def created(data) -> Response:
    return success(data, 201)


def no_content() -> Response:
    return Response(
        None,
        status=204,
        headers=CORS_HEADERS,
    )


def error(
    code: str,
    message: str,
    status: int,
) -> Response:
    return json_response(
        {
            "error": {
                "code": code,
                "message": message,
            }
        },
        status,
    )


def bad_request(message: str) -> Response:
    return error("BAD_REQUEST", message, 400)


def unauthorized(
    message: str = "Authentication required",
) -> Response:
    return error("UNAUTHORIZED", message, 401)


def forbidden(
    message: str = "Access denied",
) -> Response:
    return error("FORBIDDEN", message, 403)


def not_found(
    message: str = "Resource not found",
) -> Response:
    return error("RESOURCE_NOT_FOUND", message, 404)


def internal_error() -> Response:
    return error(
        "INTERNAL_SERVER_ERROR",
        "An unexpected error occurred",
        500,
    )