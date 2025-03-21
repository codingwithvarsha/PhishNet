document.getElementById('urlForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const url = document.getElementById('urlInput').value;

    // Logic to check the URL
    fetch('/check-url', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    })
    .then(response => response.json())
    .then(data => {
        const resultDiv = document.getElementById('result');
        if (data.isPhishing) {
            resultDiv.innerHTML = '<p style="color: red;">This URL is potentially malicious!</p>';
        } else {
            resultDiv.innerHTML = '<p style="color: green;">This URL is safe!</p>';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '<p style="color: red;">An error occurred while checking the URL.</p>';
    });
});
