let count = 0;
var multiplier = 1;
var speed = 1000;

const clicker = document.getElementById('clicker');
var countContainer = document.getElementById('countContainer');


clicker.addEventListener('click', function () {
    incrementNumber()
    countContainer.innerHTML = count
})

function incrementNumber() {
    count += multiplier;
    console.log(count);
    countContainer.innerHTML = count
}

function updateProgress(progressId) {
    var progressBar = document.getElementById(progressId);
    var currentWidth = progressBar.style.width || '0%';
    var newWidth = parseInt(currentWidth) + 10;
    progressBar.style.width = newWidth > 100 ? '100%' : newWidth + '%';
}

setInterval(incrementNumber, speed);
