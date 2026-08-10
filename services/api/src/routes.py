from router.router import Router

from modules.health.routes import register as register_health
from modules.trips.routes import register as register_trips

router = Router()

register_health(router)
register_trips(router)
