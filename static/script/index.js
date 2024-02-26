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

setInterval(incrementNumber, speed);
