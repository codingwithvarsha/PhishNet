
document.addEventListener("DOMContentLoaded", function () {
    const getStartedBtn = document.getElementById("getStartedBtn");
    const inputSection = document.getElementById("inputSection");
    const backButton = document.getElementById("backButton");
    const checkButton = document.getElementById("checkButton");
    const urlInput = document.getElementById("urlInput");
    const resultDiv = document.getElementById("result");

    getStartedBtn.addEventListener("click", function () {
        inputSection.style.display = "block";
        inputSection.scrollIntoView({ behavior: "smooth" });
    });

    backButton.addEventListener("click", function () {
        inputSection.style.display = "none";
        document.getElementById("home").scrollIntoView({ behavior: "smooth" });
    });

    checkButton.addEventListener("click", async function () {
        const url = urlInput.value.trim();
        if (!url) {
            resultDiv.textContent = "Please enter a URL.";
            resultDiv.style.color = "red";
            return;
        }

        resultDiv.textContent = "Checking...";
        resultDiv.style.color = "black";

        try {
            const response = await fetch('/check-url', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ url }),
            });

            const data = await response.json();
            if (data.isPhishing) {
                resultDiv.textContent = "⚠️ This link may be a phishing link!";
                resultDiv.style.color = "red";
            } else {
                resultDiv.textContent = "✅ This link seems safe.";
                resultDiv.style.color = "green";
            }
        } catch (error) {
            console.error('Error:', error);
            resultDiv.textContent = "Error checking URL. Please try again.";
            resultDiv.style.color = "red";
        }
    });
});
document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("input-link").addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior

        let inputSection = document.getElementById("input-section");

        if (inputSection) {
            inputSection.style.display = "block"; // Make section visible

            // Delay scrolling slightly to allow rendering
            setTimeout(() => {
                inputSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
        }
    });
});
