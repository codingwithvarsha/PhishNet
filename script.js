// public/script.js
document.getElementById('checkButton').addEventListener('click', async () => {
    const urlInput = document.getElementById('urlInput');
    const resultDiv = document.getElementById('result');
    const url = urlInput.value.trim();

    if (!url) {
        alert('Please enter a URL.');
        return;
    }

    resultDiv.style.display = 'none'; // Hide previous result
    resultDiv.className = 'result'; // Reset class

    try {
        const response = await fetch('http://localhost:3000/check-url', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ url }),
        });

        const data = await response.json();

        if (data.isPhishing) {
            resultDiv.className = 'result phishing';
            resultDiv.innerText = '⚠️ This URL is potentially harmful!';
        } else {
            resultDiv.className = 'result safe';
            resultDiv.innerText = '✅ This URL is safe!';
        }

        resultDiv.style.display = 'block'; // Show result
    } catch (error) {
        console.error(error);
        resultDiv.className = 'result';
        resultDiv.innerText = '❌ An error occurred while checking the URL.';
        resultDiv.style.display = 'block'; // Show error message
    }
});