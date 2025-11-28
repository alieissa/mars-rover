from django.core.cache import cache
from . import rover


class FleetService:

    def get_default_fleet(self, fleet):
        return [
            {
                "id": i,
                "fleet": fleet,
                "status": "active",
                "x": i,
                "y": 0,
                "direction": "N",
            }
            for i in range(5)
        ]

    def fleet_exists(self, fleet):
        current_fleet = cache.get(fleet)
        return current_fleet != None

    def start_fleet(self, fleet):
        default_fleet = self.get_default_fleet(fleet)
        cache.set(fleet, default_fleet)

        for r in default_fleet:
            rover.start(**r)

        return default_fleet

    def remove_fleet(self, fleet):
        cache.delete(fleet)
