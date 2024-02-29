let count = 1000000;
let multiplier = 1;
let cps = 1

// Defining progress for each thingy.
class Building {
    constructor(led, solar, boiler, gshp, insulation) {
        this.ledBulbLevel = led
        this.ledBulbPrices = [0, 25, 30, 35, 40, 45, 50, 60, 75, 100, 125, 150, 175, 200, 250, 300, 350, 500, 600, 700, 1200]
        this.solarPanelLevel = solar
        this.solarPanelPrice = [0, 2500, 3000, 3500, 4000, 4500, 5000, 6000, 7500, 10000, 12500, 15000, 17500, 20000, 25000, 30000, 35000, 50000, 60000, 70000, 120000]
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

function updateCount() {
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
    initSpin()
});

function initSpin(){
    console.log("CLICK")
    incrementNumber()
    swapBlades()
    if (!isSpinning) {
        lastTimestamp = null; // Reset lastTimestamp on start
        window.requestAnimationFrame(spin);
        isSpinning = true;
    }
    speed += baseSpeedPerFrame; // Increase the speed with each click
}

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

function LEDupgrade(building){
    if (building.ledBulbLevel == 20){
        maxLevel(1);
    } else if (count >= building.ledBulbPrices[building.ledBulbLevel+1]) {
        count -= building.ledBulbPrices[building.ledBulbLevel+1]
        updateCount();
        multiplier += ((building.ledBulbLevel + 1) / 12.5);
        updateProgress((building.ledBulbLevel*5)+5, "progress1");
        building.ledBulbLevel += 1 
        if (building.ledBulbLevel == 20) {
            box = document.getElementById("upgrade1")
            box.innerHTML = `LED Light Upgrade: MAX`
        } else{
            updateUpgradeText(1, building.ledBulbPrices[building.ledBulbLevel+1])
        }
    }
    else {
        insufficientFunds(1);
    }    
};

function SolarUpgrade(building){
    if (building.solarPanelLevel == 20){
        maxLevel(2);
    } else if (count >= building.solarPanelPrice[building.solarPanelLevel+1]) {
        count -= building.solarPanelPrice[building.solarPanelLevel+1]
        updateCount();
        multiplier += ((building.solarPanelLevel + 1) / 1.25);
        updateProgress((building.solarPanelLevel*5)+5, "progress2");
        building.solarPanelLevel += 1
        if (building.solarPanelLevel == 20) {
            box = document.getElementById("upgrade2")
            box.innerHTML = `Solar Panel Upgrade: MAX`
        } else{
            updateUpgradeText(2, building.solarPanelPrice[building.solarPanelLevel+1])
        }
        
    }
    else {
        insufficientFunds(2);
    }    
};

function BoilerUpgrade(building){
    if (building.boilerUpgrade == true){
        alreadyUpgraded(3)
    }
    else if (count >= building.boilerPrice){
        count -= building.boilerPrice
        updateCount();
        multiplier += 150
        updateProgress(100, "progress3")
        building.boilerUpgrade = true
        box = document.getElementById("upgrade3")
        box.innerHTML = 'More Efficienct Boiler Upgrade: Already Upgraded'
    } else{
        insufficientFunds(3);
    }

};

function GroundSourceHeatPumpsUpgrade(building){
    if (building.groundSourceHeatPumpsUpgrade == true){
        alreadyUpgraded(4)
    }
    else if (count >= building.groundSourceHeatPumpsPrice){
        count -= building.groundSourceHeatPumpsPrice
        updateCount();
        multiplier += 500
        updateProgress(100, "progress4")
        building.groundSourceHeatPumpsUpgrade = true
        box = document.getElementById("upgrade4")
        box.innerHTML = 'Ground Source Heat Pump Upgrade: Already Upgraded'
    } else{
        insufficientFunds(4);
    }

};

function InsulationUpgrade(building){
    if (building.boilerUpgrade == true){
        alreadyUpgraded(3)
    }
    else if (count >= building.boilerPrice){
        count -= building.boilerPrice
        updateCount();
        multiplier += 150
        updateProgress(100, "progress3")
        building.boilerUpgrade = true
        box = document.getElementById("upgrade3")
        box.innerHTML = 'More Efficienct Boiler Upgrade: Already Upgraded'
    } else{
        insufficientFunds(3);
    }
    
};

const tempFunds = {};
const tempLevel = {};
const tempUpgrade = {};

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

async function alreadyUpgraded(id){
    const box = document.getElementById("upgrade" + id)
    if (!tempUpgrade[id-3]) {
        tempLevel[id-3] = box.innerHTML;
    }
    box.innerHTML = "Already Upgraded."
    await sleep(500)
    box.innerHTML = tempLevel[id-3]
}

async function updateUpgradeText(id, price){
    const box = document.getElementById("upgrade" + id)
    if (id == 1){
        box.innerHTML = `LED Lightbulb Upgrade: £${price}`
    } else if (id==2){
        box.innerHTML = `Solar Panel Upgrade: £${price}`
    } else if (id==3){
        box.innerHTML = `Boiler Upgrade: £${price}`
    } else if (id==4){
        box.innerHTML = `Ground Source Heat Pump Upgrade: £${price}`
    } else{
        box.innerHTML = `Insulation Upgrade: £${price}`
    }
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

// Takes in the array and for each element, spins once.
async function detectMobileInput(){
    const result = await fetch("/api/clicks")
    const clicks = await result.json();
    for (item of clicks){
        initSpin()
    }
}

// Polling rate is currently set at 100ms.
setInterval(detectMobileInput, 100)

function updateStats(building){
    updateProgress((building.ledBulbLevel*5), "progress1");
    updateUpgradeText(1, building.ledBulbPrices[building.ledBulbLevel])
    updateProgress((building.solarPanelLevelBulbLevel*5), "progress2");
    updateUpgradeText(2, building.ledBulbPrices[building.ledBulbLevel])
    updateProgress((building.ledBulbLevel*5), "progress3");
    updateUpgradeText(3, building.ledBulbPrices[building.ledBulbLevel])
    updateProgress((building.ledBulbLevel*5), "progress4");
    updateUpgradeText(4, building.ledBulbPrices[building.ledBulbLevel])
    updateProgress((building.ledBulbLevel*5), "progress5");
    updateUpgradeText(5, building.ledBulbPrices[building.ledBulbLevel])
}