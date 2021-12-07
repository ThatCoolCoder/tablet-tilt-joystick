socket = io.connect('', {
    // auth: this.passwordInput.value,
});

var connected = false;
var globalX;
var globalY;

socket.on('connect', () => {
    alert('Connected');
    connected = true;
});

socket.on('disconnect', () => {
    alert('Disconnected');
});

socket.on('connect_failed', () => {
    alert('Failed to connect');
});

window.addEventListener('deviceorientation', event => {
    if (connected) {
        // Yes it's terrible weird code but it's because the center position of the things
        // is in a totally different position from what I want
        
        var y = event.gamma;
        if (y < 0) y += 180;
        y -= 90;
        y /= 90;
        globalY = y;
        y *= -1; // invert pitch controls
        
        var x = event.beta;
        if (y > 0){
            if (x < 0) x = -180 - x;
            else x = 180 - x;
        }
        x /= 90;
        globalX = x;
        

        socket.emit('update_joystick_position', {x: x, y: y});
    }
}, true);

setInterval(() => {
    document.getElementById('x').innerText = globalX;
    document.getElementById('y').innerText = globalY;
}, 100);