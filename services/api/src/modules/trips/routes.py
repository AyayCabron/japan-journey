from modules.trips.controller import create_trip, list_trips


def register(router):
    router.get(
        "/api/v1/trips",
        list_trips,
    )

    router.post(
        "/api/v1/trips",
        create_trip,
    )