import socket
import argparse

from tablet_tilt_joystick.show_qr_link import show_qr_link
from tablet_tilt_joystick import server
from tablet_tilt_joystick import joystick_control

parser = argparse.ArgumentParser()
parser.add_argument('--port',
    '-p',
    type=int,
    action='store',
    default=4242,
    help='Port to run server on.')
parser.add_argument('--suppress-qr',
    '-s',
    action='store_true',
    help='Supress trying to display a QR link to the interface')
args = parser.parse_args()

def main():
    if not args.suppress_qr:
        hostname = socket.gethostname()
        local_ip = socket.gethostbyname(hostname + '.local')
        show_qr_link(f'http://{local_ip}:{args.port}')

    joystick_control.init_joystick()
    server.start(args.port, joystick_control.set_position)


if __name__ == '__main__':
    main()
