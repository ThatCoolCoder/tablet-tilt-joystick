from tablet_tilt_joystick import server
from tablet_tilt_joystick import joystick_control

if __name__ == '__main__':
    joystick_control.init_joystick()
    server.start(4242, joystick_control.set_position)