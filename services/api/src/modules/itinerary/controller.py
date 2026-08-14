from integrations.supabase.client import SupabaseClient
from router.request import get_bearer_token, get_json
from router.response import bad_request, success, unauthorized


def create_client(env):
    return SupabaseClient(
        env.SUPABASE_URL,
        env.SUPABASE_PUBLISHABLE_KEY,
    )


async def get_itinerary(request, env, params):
    token = get_bearer_token(request)

    if not token:
        return unauthorized()

    trip_id = params["tripId"]

    client = create_client(env)

    status, days = await client.get(
        (
            "/rest/v1/itinerary_days"
            "?select=id,trip_id,date,title,notes,"
            "created_at,updated_at"
            f"&trip_id=eq.{trip_id}"
            "&order=date.asc"
        ),
        token,
    )

    if status != 200:
        raise RuntimeError(
            f"Unable to load itinerary days: {status} {days}"
        )

    result = []

    for day in days:
        day_id = day["id"]

        item_status, items = await client.get(
            (
                "/rest/v1/itinerary_items"
                "?select=id,itinerary_day_id,title,item_type,"
                "start_time,end_time,location_name,notes,"
                "position,created_at,updated_at"
                f"&itinerary_day_id=eq.{day_id}"
                "&order=position.asc"
            ),
            token,
        )

        if item_status != 200:
            raise RuntimeError(
                f"Unable to load itinerary items: "
                f"{item_status} {items}"
            )

        result.append(
            {
                "id": day["id"],
                "tripId": day["trip_id"],
                "date": day["date"],
                "title": day["title"],
                "notes": day["notes"],
                "createdAt": day["created_at"],
                "updatedAt": day["updated_at"],
                "items": [
                    {
                        "id": item["id"],
                        "itineraryDayId": item[
                            "itinerary_day_id"
                        ],
                        "title": item["title"],
                        "itemType": item["item_type"],
                        "startTime": item["start_time"],
                        "endTime": item["end_time"],
                        "locationName": item[
                            "location_name"
                        ],
                        "notes": item["notes"],
                        "position": item["position"],
                        "createdAt": item["created_at"],
                        "updatedAt": item["updated_at"],
                    }
                    for item in items
                ],
            }
        )

    return success(result)


async def create_itinerary_day(request, env, params):
    token = get_bearer_token(request)

    if not token:
        return unauthorized()

    trip_id = params["tripId"]
    body = await get_json(request)

    date = body.get("date")

    if not date:
        return bad_request("date is required")

    client = create_client(env)

    status, rows = await client.post(
        "/rest/v1/itinerary_days",
        token,
        {
            "trip_id": trip_id,
            "date": date,
            "title": body.get("title"),
            "notes": body.get("notes"),
        },
    )

    if status != 201:
        raise RuntimeError(
            f"Unable to create itinerary day: "
            f"{status} {rows}"
        )

    row = rows[0]

    return success(
        {
            "id": row["id"],
            "tripId": row["trip_id"],
            "date": row["date"],
            "title": row["title"],
            "notes": row["notes"],
            "createdAt": row["created_at"],
            "updatedAt": row["updated_at"],
            "items": [],
        },
        201,
    )


async def create_itinerary_item(request, env, params):
    token = get_bearer_token(request)

    if not token:
        return unauthorized()

    day_id = params["dayId"]
    body = await get_json(request)

    title = body.get("title", "").strip()

    if not title:
        return bad_request("title is required")

    client = create_client(env)

    status, rows = await client.post(
        "/rest/v1/itinerary_items",
        token,
        {
            "itinerary_day_id": day_id,
            "title": title,
            "item_type": body.get(
                "itemType",
                "activity",
            ),
            "start_time": body.get("startTime"),
            "end_time": body.get("endTime"),
            "location_name": body.get(
                "locationName"
            ),
            "notes": body.get("notes"),
            "position": body.get("position", 0),
        },
    )

    if status != 201:
        raise RuntimeError(
            f"Unable to create itinerary item: "
            f"{status} {rows}"
        )

    row = rows[0]

    return success(
        {
            "id": row["id"],
            "itineraryDayId": row["itinerary_day_id"],
            "title": row["title"],
            "itemType": row["item_type"],
            "startTime": row["start_time"],
            "endTime": row["end_time"],
            "locationName": row["location_name"],
            "notes": row["notes"],
            "position": row["position"],
            "createdAt": row["created_at"],
            "updatedAt": row["updated_at"],
        },
        201,
    )