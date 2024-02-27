let count = 0;
var multiplier = 1;
var speed = 1000;
let isClicked = false;

const clicker = document.getElementById('clicker');
var countContainer = document.getElementById('countContainer');


clicker.addEventListener('click', function () {
    incrementNumber()
    countContainer.innerHTML = count
    increaseAnimationSpeed()
})

const turbine = document.querySelector('.turbine');

function increaseAnimationSpeed() {
    isClicked = true;
    const currentAnimationDuration = parseFloat(getComputedStyle(turbine).animationDuration);
    if (currentAnimationDuration > 0.01){
        speed -= (speed/50)
        turbine.style.animationDuration = (currentAnimationDuration * speed) + 'ms';
    };
    setTimeout(() => {
        isclicked = false;
    }, 5000)
}

function decreaseAnimationSpeed() {
    // To Do at the end. If you want to.
} 

function incrementNumber() {
    count += multiplier;
    countContainer.innerHTML = count
    // decreaseAnimationSpeed()
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


setInterval(incrementNumber, speed);
