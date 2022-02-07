import socket

from tablet_tilt_joystick.show_qr_link import show_qr_link
from tablet_tilt_joystick import server
from tablet_tilt_joystick import joystick_control

PORT = 4242


def main():
    hostname = socket.gethostname()
    local_ip = socket.gethostbyname(hostname + '.local')
    show_qr_link(f'http://{local_ip}:{PORT}')

    joystick_control.init_joystick()
    server.start(PORT, joystick_control.set_position)


if __name__ == '__main__':
    main()
