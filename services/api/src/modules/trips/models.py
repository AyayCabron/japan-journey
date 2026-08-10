from dataclasses import dataclass


@dataclass(slots=True)
class Trip:
    id: str
    owner_id: str

    name: str

    slug: str

    destination_country: str

    start_date: str | None

    end_date: str | None

    created_at: str

    updated_at: str