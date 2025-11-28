from django.urls import re_path

from . import control_consumer

# TODO Update url pattern
websocket_urlpatterns = [
    re_path(r"rovers/(?P<fleet>\w+)/$", control_consumer.ControlConsumer.as_asgi()),
]
