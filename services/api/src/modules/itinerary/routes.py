from modules.itinerary.controller import (
    create_itinerary_day,
    create_itinerary_item,
    get_itinerary,
)


def register(router):
    router.get(
        "/api/v1/trips/{tripId}/itinerary",
        get_itinerary,
    )

    router.post(
        "/api/v1/trips/{tripId}/itinerary/days",
        create_itinerary_day,
    )

    router.post(
        "/api/v1/itinerary/days/{dayId}/items",
        create_itinerary_item,
    )