# Tablet Tilt Joystick

A program that lets you use your tablet's tilting to emulate an actual joystick on a computer. Currently this only works on Linux systems as it uses `uinput` behind the scenes. It might work on Macs, I haven't got a Mac so I can't test.

It's called **tablet** tilt joystick but it will work with any handheld device with a reasonably modern web browser and an orientation sensor.

Runs a light web server which you can connect to in a browser on your tablet.

Install with pip then run with `python3 -m tablet_tilt_joystick` or just `tablet_tilt_joystick` and connect to `<your ip>:4242` on a mobile device to get started. If a suitable image display program is found, it will also show a QR code that you can scan with a mobile device to get to the IP quickly. The joystick will show up in your system as something like `python-uinput`.

## Troubleshooting

If your tablet fails to find the server, make sure this program isn't blocked by a firewall. Also try navigating to your computers ip manually on the tablet.

## Publishing to pypi:

First install the required packages: `pip install build twine`.

Then run `python -m build` from this directory. If there were no errors then run `python3 -m twine upload dist/*`.