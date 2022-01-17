socket = io.connect('', {
    // auth: this.passwordInput.value,
});

var connected = false;

const connectedLabel = document.getElementById('connected');

const globalToggleCheckbox = document.getElementById('globalToggle');

const elevatorSensitivitySlider = document.getElementById('elevatorSensitivity');
const aileronSensitivitySlider = document.getElementById('aileronSensitivity');
const rudderSensitivitySlider = document.getElementById('rudderSensitivity');

const elevatorTrimSlider = document.getElementById('elevatorTrim');
const aileronTrimSlider = document.getElementById('aileronTrim');
const rudderTrimSlider = document.getElementById('rudderTrim');

const rudderSlider = document.getElementById('rudder');

var currentValues = {
    elevator: 0,
    aileron: 0,
    rudder: 0
}

var rudderActivated = false;

const updateInterval = 50;

socket.on('connect', () => {
    connected = true;
    connectedLabel.innerText = 'Connected';   
});

socket.on('disconnect', () => {
    connectedLabel.innerText = 'Disconnected';
});

socket.on('connect_failed', () => {
    alert('Failed to connect');
});

window.addEventListener('deviceorientation', event => {
    if (connected) {
        // Yes it's terrible weird code but it's because the center position of the things
        // is in a totally different position from what I want
        
        var elevator = event.gamma;
        if (elevator < 0) elevator += 180;
        elevator -= 90;
        elevator /= 90;
        elevator *= -1; // invert elevator controls
        
        var aileron = event.beta;
        if (elevator > 0){
            if (aileron < 0) aileron = -180 - aileron;
            else aileron = 180 - aileron;
        }
        aileron /= 90;
        
        elevator *= Number(elevatorSensitivitySlider.value);
        elevator += Number(elevatorTrimSlider.value);
        currentValues.elevator = elevator;

        aileron *= Number(aileronSensitivitySlider.value);
        aileron += Number(aileronTrimSlider.value);
        currentValues.aileron = aileron;
    }
}, true);

rudderSlider.addEventListener('touchstart', () => {
    rudderActivated = true;
});

rudderSlider.addEventListener('touchend', () => {
    rudderActivated = false;
});

setInterval(() => {
    if (globalToggleCheckbox.checked)
    {
        currentValues.rudder = Number(rudderSlider.value);

        socket.emit('update_joystick_position', currentValues);

        if (! rudderActivated) rudderSlider.value = 0;
    }
}, updateInterval);