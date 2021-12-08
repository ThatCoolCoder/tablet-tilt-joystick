socket = io.connect('', {
    // auth: this.passwordInput.value,
});

var connected = false;

const pitchSensitivitySlider = document.getElementById('pitchSensitivity');
const rollSensitivitySlider = document.getElementById('rollSensitivity');

const pitchTrimSlider = document.getElementById('pitchTrim');
const rollTrimSlider = document.getElementById('rollTrim');

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
        
        var pitch = event.gamma;
        if (pitch < 0) pitch += 180;
        pitch -= 90;
        pitch /= 90;
        pitch *= -1; // invert pitch controls
        
        var roll = event.beta;
        if (pitch > 0){
            if (roll < 0) roll = -180 - roll;
            else roll = 180 - roll;
        }
        roll /= 90;
        
        pitch *= Number(pitchSensitivitySlider.value);
        pitch += Number(pitchTrimSlider.value);

        roll *= Number(rollSensitivitySlider.value);
        pitch += Number(rollTrimSlider.value);

        socket.emit('update_joystick_position', {roll: roll, pitch: pitch});
    }
}, true);