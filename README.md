# Tablet Tilt Joystick

A program that lets you use your tablet's tilting to emulate an actual joystick on a computer. Currently this only works on Linux systems as it uses `uinput` behind the scenes. It might work on Macs, I haven't got a Mac so I can't test.

It's called **tablet** tilt joystick but it will work with any handheld device with a reasonably modern web browser and an orientation sensor.

Runs a light web server which you can connect to in a browser on your tablet.

**It currently does not work on most (any?) mobile browsers as they either don't support orientation sensor at all or require HTTPS to use it.** 
This has been tested on:
- IOS 12 + Safari
- IOS 12 + Opera
- Android + Firefox
- Android + Opera
- Android + Chrome
- Android + Samsung Internet

The only platform I found that it does work on is Safari on IOS 11 but that's quite outdated.

## Basic usage

Install with pip (`pip3 install tablet-tilt-joystick`) then run with `python3 -m tablet_tilt_joystick` or just `tablet_tilt_joystick` and connect to `<your ip>:4242` on a mobile device to get started. If a suitable image display program is found, it will also show a QR code that you can scan with a mobile device to get to the IP quickly. The joystick will show up in your system as something like `python-uinput`.

## Advanced usage

For advanced usage instructions, run `python3 -m tablet_tilt_joystick -h`.

## Troubleshooting

If your tablet fails to find the server, make sure this program isn't blocked by a firewall. Also try navigating to your computers IP manually on the tablet.

## Publishing to pypi (for devs)

First install the required packages: `pip install build twine`.

Then run `python -m build` from this directory. If there were no errors then run `python3 -m twine upload dist/*`.

## Roadmap:
- Make it work on Windows (requires port of uinput)
- Give users a warning when orientation sensor is blocked

## Changelog:

#### 1.2.0
- Command line options to use custom hosting port and suppress displaying QR code

#### 1.1.1
- Fix missing dependencies

#### 1.1.0
- First version published to pypi
- Opens QR code

#### 1.0.0 (not published on pypi)
- Basic functionality of tilting tablet
