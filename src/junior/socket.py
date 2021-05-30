from flask_socketio import SocketIO, emit, send                         # noqa

#: A :class:`~flask_socketio.SocketIO` allowing websocket clients
#: to connect for a persistent, realtime channel.
socket = SocketIO()
