let count = 0;
let multiplier = 1;
let cps = 1

// Defining progress for each thingy.
class Building {
    constructor(led, solar, boiler, gshp, insulation) {
        this.ledBulbLevel = led
        this.ledBulbPrices = [0, 25, 30, 35, 40, 45, 50, 60, 75, 100, 125, 150, 175, 200, 250, 300, 350, 500, 600, 700, 1200]
        this.solarPanelLevel = solar
        this.solarPanelPrice = [2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 50000, 60000, 70000, 120000]
        this.boilerUpgrade = boiler
        this.boilerPrice = 15000
        this.groundSourceHeatPumpsUpgrade = gshp
        this.groundSourceHeatPumpsPrice = 50000
        this.insulationUpgrade = insulation
        this.insulationPrice = 120000
    }
}

const kimmeridge = new Building(0, 0, false, false, false)
const fusion = new Building(20, 20, false, true, false)
const dorset = new Building(0, 0, false, false, false)
const pgb = new Building(20, 20, false, false, false)


var countContainer = document.getElementById('countContainer');

clicker = document.getElementById('clicker');

function incrementNumber() {
    count += multiplier * cps;
    countContainer.innerHTML = "£" + count.toFixed(2)
}

function updateCount(amount) {
    count += amount * count; 
    countContainer.innerHTML = "£" + count.toFixed(2);
}

function updateProgress(progress, progressBarId) {
    var progressBar = document.getElementById(progressBarId);
    if (progressBar) {
        progressBar.style.width = progress + '%';
    } else {
        console.error("Progress bar with id '" + progressBarId + "' not found.");
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

setInterval(incrementNumber, 1000);

function LEDupgrade(){
    if (kimmeridge.ledBulbLevel == 20){
        maxLevel(1);
    } else if (count >= kimmeridge.ledBulbPrices[kimmeridge.ledBulbLevel+1]) {
        count -= kimmeridge.ledBulbPrices[kimmeridge.ledBulbLevel+1]
        updateCount(0);
        multiplier += ((kimmeridge.ledBulbLevel + 1) / 12.5);
        updateProgress((kimmeridge.ledBulbLevel*5)+5, "progress1");
        kimmeridge.ledBulbLevel += 1 
        updateUpgradeText(1, kimmeridge.ledBulbPrices[kimmeridge.ledBulbLevel+1])

    }
    else {
        insufficientFunds(1);
    }    
};

function SolarUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress2(100);
    } else {
        insufficientFunds(2);
    }
    
};
function BoilerUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress3(100);
    } else {
        insufficientFunds(3);
    }
    
};

function InsulationUpgrade(){
    if (count >= 10) {
        count -= 5;
        updateCount(0); 
        multiplier = 2;
        updateProgress4(100);
    } else {
        insufficientFunds(4);
    }
    
};

const tempFunds = {};
const tempLevel = {};

async function insufficientFunds(id){
    const box = document.getElementById("upgrade" + id)
    if (!tempFunds[id-1]) {
        tempFunds[id-1] = box.innerHTML;
    }    
    box.innerHTML = "Insufficient Funds."
    await sleep(500)
    box.innerHTML = tempFunds[id-1]
}

async function maxLevel(id){
    const box = document.getElementById("upgrade" + id)
    if (!tempLevel[id-1]) {
        tempLevel[id-1] = box.innerHTML;
    }    
    box.innerHTML = "Already Max Level."
    await sleep(500)
    box.innerHTML = tempLevel[id-1]
};

async function updateUpgradeText(id, price){
    const box = document.getElementById("upgrade" + id)
    box.innerHTML = `LED Lightbulb Upgrade: £${price}`
}

// Grab the image container
const imageContainer = document.getElementById('image-container');

// Track if dragging is active, and initial mouse positions
let isDragging = false, startX, startY;

// Start dragging
imageContainer.addEventListener('mousedown', function(e) {
    isDragging = true;
    startX = e.pageX - this.offsetLeft; // Initial mouse X position
    startY = e.pageY - this.offsetTop; // Initial mouse Y position
    this.style.cursor = 'grabbing'; // Change cursor to grabbing
    e.preventDefault(); // Prevents the default image drag
});

// Stop dragging
document.addEventListener('mouseup', function() {
    isDragging = false;
    imageContainer.style.cursor = 'grab'; // Change cursor back to grab
});

// Handle mouse move for dragging
document.addEventListener('mousemove', function(e) {
    if (!isDragging) return; // Exit if not dragging
    const x = e.pageX - imageContainer.offsetLeft; // Current mouse X
    const y = e.pageY - imageContainer.offsetTop; // Current mouse Y
    const walkX = (x - startX); // Horizontal move distance
    const walkY = (y - startY); // Vertical move distance
    imageContainer.scrollLeft -= walkX; // Scroll horizontally
    imageContainer.scrollTop -= walkY; // Scroll vertically
    startX = x; // Reset initial X to current X
    startY = y; // Reset initial Y to current Y
});
