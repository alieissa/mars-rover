from channels.generic.websocket import AsyncJsonWebsocketConsumer
from .fleet_service import FleetService
import logging


class ControlConsumer(AsyncJsonWebsocketConsumer):
    fleet_service = FleetService()

    def get_fleet_name(self):
        return self.scope["url_route"]["kwargs"]["fleet"]

    def get_message(self, content):
        return {
            "type": "handle.msg",
            "origin": self.channel_name,
            "message": content,
        }

    async def connect(self):
        self.fleet = self.get_fleet_name()

        if not self.fleet_service.fleet_exists(self.fleet):
            self.fleet_service.start_fleet(self.fleet)

        await self.channel_layer.group_add(self.fleet, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.fleet, self.channel_name)
        self.fleet_service.remove_fleet(self.fleet)
        self.close()

    async def receive_json(self, content):
        messsage = self.get_message(content)
        await self.channel_layer.group_send(self.fleet, messsage)

    async def handle_msg(self, event):
        if self.channel_name == event["origin"]:
            return

        message = event["message"]
        await self.send_json(message)
