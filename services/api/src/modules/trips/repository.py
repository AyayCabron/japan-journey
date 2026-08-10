from integrations.supabase.client import SupabaseClient
from modules.trips.models import Trip


class TripRepository:
    def __init__(
        self,
        client: SupabaseClient,
        access_token: str,
    ):
        self.client = client
        self.access_token = access_token

    async def list(self) -> list[Trip]:
        status, rows = await self.client.get(
            (
                "/rest/v1/trips"
                "?select=id,owner_id,name,slug,destination_country,"
                "start_date,end_date,created_at,updated_at"
                "&order=created_at.desc"
            ),
            self.access_token,
        )

        if status != 200:
            raise RuntimeError(f"Supabase returned status {status}")

        return [
            Trip(
                id=row["id"],
                owner_id=row["owner_id"],
                name=row["name"],
                slug=row["slug"],
                destination_country=row["destination_country"],
                start_date=row["start_date"],
                end_date=row["end_date"],
                created_at=row["created_at"],
                updated_at=row["updated_at"],
            )
            for row in rows
        ]

    async def create(
        self,
        payload: dict,
    ) -> Trip:
        status, rows = await self.client.post(
            "/rest/v1/trips",
            self.access_token,
            payload,
        )

        if status != 201:
            raise RuntimeError(
                f"Supabase returned status {status}: {rows}"
            )

        if not rows:
            raise RuntimeError(
                "Supabase returned an empty response"
            )

        row = rows[0]

        return Trip(
            id=row["id"],
            owner_id=row["owner_id"],
            name=row["name"],
            slug=row["slug"],
            destination_country=row["destination_country"],
            start_date=row["start_date"],
            end_date=row["end_date"],
            created_at=row["created_at"],
            updated_at=row["updated_at"],
        )