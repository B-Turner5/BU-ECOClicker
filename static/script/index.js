let count = 0
const clicker = document.getElementById('clicker');
console.log(clicker)
clicker.addEventListener('click', function () {
    count += 1
    console.log(count)
})
function updateProgress(progressId) {
    var progressBar = document.getElementById(progressId);
    var currentWidth = progressBar.style.width || '0%';
    var newWidth = parseInt(currentWidth) + 10;
    progressBar.style.width = newWidth > 100 ? '100%' : newWidth + '%';
}