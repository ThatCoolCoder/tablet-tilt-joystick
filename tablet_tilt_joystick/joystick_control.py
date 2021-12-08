import math
import uinput

events = (uinput.BTN_JOYSTICK, uinput.ABS_X + (0, 255, 0, 0), uinput.ABS_Y + (0, 255, 0, 0))

def init_joystick():
    global device
    device = uinput.Device(events)
    device.emit(uinput.ABS_X, 128, syn=False)
    device.emit(uinput.ABS_Y, 128, syn=False)

def map_value(value, in_min, in_max, out_min, out_max):
    return out_min + (((value - in_min) / (in_max - in_min)) * (out_max - out_min))

def set_position(roll: float, pitch: float):
    device.emit(uinput.ABS_X, int(map_value(roll, -1, 1, 0, 255)))
    device.emit(uinput.ABS_Y, int(map_value(pitch, -1, 1, 0, 255)))