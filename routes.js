const express = require("express");
const router = express.Router();
const checkPhishing = require("./checkPhishing"); // Import function

// Route to check if a URL is malicious
router.post("/check", async (req, res) => {
    const { url } = req.body;
    const result = await checkPhishing(url);
    res.json(result);
});

module.exports = router;
