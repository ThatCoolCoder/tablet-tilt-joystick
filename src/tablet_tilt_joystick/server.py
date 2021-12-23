import os
import socketio
import eventlet

# todo: add password system
# password = input('Choose password needed by clients to use (leave blank for none): ')
password = ''

event_callback = None

working_dir = os.path.dirname(os.path.abspath(__file__))
sio = socketio.Server()
app = socketio.WSGIApp(sio, static_files={
    '/': f'{working_dir}/client/'
})

@sio.event
def connect(sid, environ, auth: str):
    '''
    Client will connect like this, where password is the password:
    socket = io.connect('', {
        auth: password,
    });
    '''
    if password != '' and auth != password:
        sio.disconnect(sid)

@sio.event
def update_joystick_position(sid, data):
    '''
    expects data to be a json like {aileron: float -1 to 1, elevator: float -1 to 1, rudder: float -1 to 1}
    '''
    if event_callback is not None:
        event_callback(data['aileron'], data['elevator'], data['rudder'])

def start(port: int, _event_callback=None):
    global event_callback
    '''
    event_callback should be a function accepting args aileron, elevator and rudder, each ranging from -1 to 1
    '''
    event_callback = _event_callback

    eventlet.wsgi.server(eventlet.listen(('', port)), app)