let count = 0
const clicker = document.getElementById('clicker');
console.log(clicker)
clicker.addEventListener('click', function () {
    count += 1
    console.log(count)
})