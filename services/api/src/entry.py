from routes import router
from workers import WorkerEntrypoint


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return await router.dispatch(
            request,
            self.env,
        )
