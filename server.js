// server.js
const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const app = express();
require('dotenv').config(); // Load environment variables from .env file

const PORT = process.env.PORT || 3000; 


// Replace with your Google Safe Browsing API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY; // Use the API key from environment variables


app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/check-url', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`, {
            client: {
                clientId: "yourcompanyname",
                clientVersion: "1.0.0"
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url }]
            }
        });

        if (response.data && response.data.matches) {
            res.json({ isPhishing: true });
        } else {
            res.json({ isPhishing: false });
        }
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: 'Error checking URL. Please try again later.' });

    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
