from modules.trips.repository import TripRepository


class TripService:
    def __init__(
        self,
        repository: TripRepository,
    ):
        self.repository = repository

    async def list_trips(self):
        return await self.repository.list()

    async def create_trip(
        self,
        payload: dict,
    ):
        return await self.repository.create(payload)