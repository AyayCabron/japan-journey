import re
from uuid import uuid4

from integrations.supabase.client import SupabaseClient
from modules.trips.repository import TripRepository
from modules.trips.schemas import trip_to_response
from modules.trips.service import TripService
from router.request import get_bearer_token, get_json
from router.response import bad_request, success, unauthorized


def create_slug(name: str) -> str:
    normalized = name.lower().strip()
    normalized = re.sub(r"[^a-z0-9]+", "-", normalized)
    normalized = normalized.strip("-")

    suffix = uuid4().hex[:8]

    return f"{normalized}-{suffix}"


async def list_trips(request, env, params):
    access_token = get_bearer_token(request)

    if not access_token:
        return unauthorized()

    client = SupabaseClient(
        env.SUPABASE_URL,
        env.SUPABASE_PUBLISHABLE_KEY,
    )

    repository = TripRepository(
        client,
        access_token,
    )

    service = TripService(repository)

    trips = await service.list_trips()

    return success(
        [trip_to_response(trip) for trip in trips]
    )


async def create_trip(request, env, params):
    access_token = get_bearer_token(request)

    if not access_token:
        return unauthorized()

    body = await get_json(request)

    name = body.get("name", "").strip()
    destination_country = body.get(
        "destinationCountry",
        "",
    ).strip()

    if not name:
        return bad_request("name is required")

    if not destination_country:
        return bad_request(
            "destinationCountry is required"
        )

    client = SupabaseClient(
        env.SUPABASE_URL,
        env.SUPABASE_PUBLISHABLE_KEY,
    )

    repository = TripRepository(
        client,
        access_token,
    )

    service = TripService(repository)

    trip = await service.create_trip(
        {
            "name": name,
            "slug": create_slug(name),
            "destination_country": destination_country,
            "start_date": body.get("startDate"),
            "end_date": body.get("endDate"),
        }
    )

    return success(
        trip_to_response(trip),
        201,
    )
