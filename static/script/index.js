let count = 0;
let multiplier = 1;
let cps = 1


var countContainer = document.getElementById('countContainer');

clicker = document.getElementById('clicker');

function incrementNumber() {
    count += multiplier * cps;
    countContainer.innerHTML = "£" + count
}

function updateCount(amount) {
    count += amount * count; 
    countContainer.innerHTML = "£" + count;
}

function updateProgress1(progress) {
    var progressBar1 = document.getElementById('progress1');
    progressBar1.style.width = progress + '%';
}

function updateProgress2(progress) {
    var progressBar2 = document.getElementById('progress2');
    progressBar2.style.width = progress + '%';
}
function updateProgress3(progress) {
    var progressBar3 = document.getElementById('progress3');
    progressBar3.style.width = progress + '%';
}

function updateProgress4(progress) {
    var progressBar4 = document.getElementById('progress4');
    progressBar4.style.width = progress + '%';
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
    swapBlades()
    countContainer.innerHTML = "£" + count
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

setInterval(incrementNumber, 1000);

function LEDupgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress1(100);
    } else {
        alert("You don't have enough money to upgrade LED lights.");
    }
    
};
function SolarUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress2(100);
    } else {
        alert("You don't have enough money to upgrade LED lights.");
    }
    
};
function BoilerUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress3(100);
    } else {
        alert("You don't have enough money to upgrade boilers.");
    }
    
};

function InsulationUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress4(100);
    } else {
        alert("You don't have enough money to upgrade boilers.");
    }
    
};