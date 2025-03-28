const express = require('express');
const router = express.Router();
const checkPhishing = require('./checkPhishing'); // Import function

// Route to check if a URL is malicious
router.post("/check-url", async (req, res) => {

    const { url } = req.body;

    // Validate the URL
    if (!url || typeof url !== 'string') {
        return res.status(400).json({ error: 'Invalid URL provided' });
    }

    try {
        const result = await checkPhishing(url);
        res.json(result);
    } catch (error) {
        console.error("Error in checkPhishing:", error);
        res.status(500).json({ error: "Internal server error" });
    }

});

module.exports = router;
