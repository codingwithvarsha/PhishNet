let scamCount = 0;

function updateScamCount() {
    scamCount++;
    const scamCountDisplay = document.getElementById('scamCount');
    scamCountDisplay.innerText = `Total Phishing Scams: ${scamCount}`;
}

function updateProgressBar(value) {
    const progressBar = document.getElementById('progressBar');
    progressBar.style.width = value + '%';
}

let progress = 0;
const interval = setInterval(() => {
    if (progress >= 100) {
        clearInterval(interval);
    } else {
        progress += 10; // Increment progress
        updateProgressBar(progress);
        updateScamCount(); // Update scam count with animation
    }
}, 500); // Update every 500ms

function toggleMenu() {
    const menuOptions = document.querySelector('.menu-options');
    menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
}

document.querySelector('.menu-button').addEventListener('click', function() {
    const menuOptions = document.querySelector('.menu-options');
    menuOptions.style.display = menuOptions.style.display === 'none' ? 'block' : 'none';
});

document.querySelectorAll('.menu-options a').forEach(option => {
    option.addEventListener('click', function() {
        // Load content based on the selected option
        const content = this.innerText;
        alert(`You selected: ${content}`);
    });
});




function cameraFlashAnimation() {
    showLoadingAnimation();

    const flash = document.createElement('div');
    flash.style.position = 'fixed';
    flash.style.top = '0';
    flash.style.left = '0';
    flash.style.width = '100%';
    flash.style.height = '100%';
    flash.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    flash.style.zIndex = '9999';
    document.body.appendChild(flash);
    
    setTimeout(() => {
        document.body.removeChild(flash);
    }, 300); // Flash duration
}

document.getElementById('checkButton').addEventListener('click', function() {
    cameraFlashAnimation();
    hideLoadingAnimation(); // Hide loading animation on button click
});


// Canvas loading animation
const canvas = document.getElementById('loadingCanvas');
const ctx = canvas.getContext('2d');

function drawLoadingAnimation() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#4169E1'; // Royal blue color
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.stroke();
}

setInterval(drawLoadingAnimation, 1000); // Redraw every second
