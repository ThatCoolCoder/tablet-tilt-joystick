# Tablet Tilt Joystick

A program that lets you use your tablet's tilting to emulate an actual joystick on a computer. Currently this only works on Linux systems as it uses `uinput` behind the scenes. It might work on Macs, I haven't got a Mac so I can't test.

It's called **tablet** tilt joystick but it will work with any handheld device with a reasonably modern web browser and an orientation sensor.

Runs a light web server which you can connect to in a browser on your tablet.

Run with `python3 -m tablet_tilt_joystick` and connect to `<your ip>:4242` on a mobile device to get started. (Make sure it's not blocked by a firewall)
The joystick will show up in your system as `python-uinput`.

## Publishing to pypi:

First install the required packages: `pip install build twine`.

Then run `python -m build` from this directory. If there were no errors then run `python3 -m twine upload --repository testpypi dist/*`.