from dataclasses import asdict

from modules.trips.models import Trip


def trip_to_response(
    trip: Trip,
):
    data = asdict(trip)

    return {
        "id": data["id"],
        "name": data["name"],
        "slug": data["slug"],
        "destinationCountry": data["destination_country"],
        "startDate": data["start_date"],
        "endDate": data["end_date"],
        "createdAt": data["created_at"],
        "updatedAt": data["updated_at"],
    }