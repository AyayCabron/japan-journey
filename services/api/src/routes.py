from modules.health.routes import register as register_health
from modules.itinerary.routes import register as register_itinerary
from modules.trips.routes import register as register_trips
from router.router import Router


router = Router()

register_health(router)
register_trips(router)
register_itinerary(router)
