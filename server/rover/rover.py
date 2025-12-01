from multiprocessing import Process
import websocket
import sys
import logging
import time
import json


class Rover:
    def __init__(self, **kwargs):
        self.fleet = kwargs["fleet"]
        self.id = kwargs["id"]
        self.x = kwargs["x"]
        self.y = kwargs["y"]
        self.direction = kwargs["direction"]
        self.status = "active"

        self.ws = websocket.WebSocketApp(
            f"ws://localhost:8000/rovers/{self.fleet}/",
            on_open=self.connect,
            on_message=self.receive,
            on_error=self.error,
            on_close=self.disconnect,
        )

    def _get_details(self):
        return {
            "id": self.id,
            "fleet": self.fleet,
            "direction": self.direction,
            "x": self.x,
            "y": self.y,
            "status": self.status,
        }

    def _get_register_command(self):
        return json.dumps(
            {
                "message": "register",
                "payload": self._get_details(),
            }
        )

    def _get_move_command(self, y):
        payload = {**self._get_details(), "y": y}
        return json.dumps(
            {
                "message": "info",
                "payload": payload,
            }
        )

    def connect(self, ws):
        logging.warning(f"Opened connection {self.fleet}")
        self.ws.send(self._get_register_command())

    def disconnect(self, ws, close_status_code, close_msg):
        logging.warning("### closed ###")
        sys.exit(1)

    def receive(self, ws, text_event):
        event = json.loads(text_event)
        message = event["message"]
        payload = event["payload"]

        if message == "command":
            # TODO Convert the command into coordinates
            return

        if message == "move" and payload["id"] == self.id:
            for i in range(5):
                time.sleep(1)
                self.ws.send(self._get_move_command(i))

        if message == "exit":
            sys.exit(1)

    def error(self, ws, error):
        logging.error("Error occurred")

    def start(self):
        # Set dispatcher to automatic reconnection, 5 second reconnect delay if connection closed unexpectedly
        self.ws.run_forever(reconnect=5)


def init(id, fleet, x, y, direction, status):
    rover = Rover(id=id, fleet=fleet, x=x, y=y, direction=direction, status=status)
    rover.start()


def start(**kwargs):
    p = Process(target=init, kwargs=kwargs)
    p.daemon = True  # dies if parent dies
    p.start()
