// JavaScript code for Spin Image on Click with Inertia

let speed = 2; // Base speed in degrees per frame (assuming 60 fps, this should be adjusted to achieve 120 degrees per second)
let angle = 0; // Current angle
let isSpinning = false; // Track if spinning
let lastTimestamp = 0; // Last animation frame timestamp
const image = document.getElementById('turbine'); // Reference to the image

// Convert base speed to degrees per second assuming 60 frames per second
const baseSpeedPerSecond = 20;
const baseSpeedPerFrame = baseSpeedPerSecond / 60;

// Increase speed on click and initialize lastTimestamp
clicker.addEventListener('click', () => {
    sendClick()
    swapBlades()
    if (!isSpinning) {
        lastTimestamp = null; // Reset lastTimestamp on start
        window.requestAnimationFrame(spin);
        isSpinning = true;
    }
    speed += baseSpeedPerFrame; // Increase the speed with each click
});

function spin(timestamp) {
    if (lastTimestamp === null) {
        lastTimestamp = timestamp; // Initialize lastTimestamp on the first frame
    }
    const delta = (timestamp - lastTimestamp) / 1000; // Time since last frame in seconds

    angle += (speed * delta) * 360; // Increase angle based on speed and time
    image.style.transform = `rotate(${angle}deg)`; // Apply rotation, ensure continuous rotation

    // Apply inertia by slightly reducing speed but never going below base speed
    if (speed > baseSpeedPerFrame) {
        speed *= 0.99; // Slow down if above base speed
    }

    window.requestAnimationFrame(spin); // Continue spinning

    lastTimestamp = timestamp;
}

var sleepSetTimeout_ctrl;

function sleep(ms) {
    clearInterval(sleepSetTimeout_ctrl);
    return new Promise(resolve => sleepSetTimeout_ctrl = setTimeout(resolve, ms));
}

async function swapBlades() {
    image.src = `static/assets/windblades.png`
    await sleep(200)
    image.src = 'static/assets/blades.png'
}

document.getElementById('selectorid').addEventListener('touchend' || 'dblclick', event => { 
    event.preventDefault();
    event.stopImmediatePropagation();
        }, {
        passive: false
        });

function sendClick(){
    $.ajax({
        url: "/api/click",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({}),
        success: function(response) {
            console.log("Click Sent Successfully.");
        },
        error: function(xhr, status, error) {
            console.error("Error sending click:", error);
        }
    })
}