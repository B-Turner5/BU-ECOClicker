let count = 0;
let multiplier = 1;

var countContainer = document.getElementById('countContainer');

clicker = document.getElementById('clicker');

function incrementNumber() {
    count += multiplier;
    countContainer.innerHTML = count
}

function updateProgress(progressId) {
    var progressBar = document.getElementById(progressId);
    var currentWidth = parseInt(progressBar.style.width) || 0;
    var increment = 10;
    var newWidth = currentWidth + increment;

    if (newWidth > 100) {
        progressBar.style.width = '100%';
    } else {
        progressBar.style.width = newWidth + '%';
    }
}

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
    console.log("CLICK")
    incrementNumber()
    countContainer.innerHTML = count
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

setInterval(incrementNumber, 1000);
