import qrcode
from PIL import ImageShow


def show_qr_link(url: str):
    image = qrcode.make(url)
    if len(ImageShow._viewers) == 0:
        print('Failed to display QR code: no viewer found on system')
    else:
        image.show()
