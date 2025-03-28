const express = require('express');
const app = express();
const routes = require('./routes');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');
const path = require('path');
require('dotenv').config();


const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(bodyParser.json({limit: "10kb"}));
app.use(express.urlencoded({extended:true, limit: "10kb"}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use('/api', routes); // Use routes for handling requests
const helmet = require('helmet');
 app.use(helmet());

 app.listen(3001, () => console.log('Server running on port 3001'));

// Root route
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


// Google Safe Browsing API key
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

app.use('/check', async (req, res) => {
    const { url } = req.body;

    try {
        const response = await axios.post(`https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${GOOGLE_API_KEY}`, {
            client: {
                clientId: "PhishNet",
                clientVersion: "1.0.0"
            },
            threatInfo: {
                threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
                platformTypes: ["ANY_PLATFORM"],
                threatEntryTypes: ["URL"],
                threatEntries: [{ url }]
            }
        });


        console.log("GOOGLE API RESPONSE:", response.data);   //debugging log

        if (response.data && response.data.matches) {
            res.json({ isPhishing: true });
        } else {
            res.json({ isPhishing: false });
        }
    } catch (error) {
        console.error("API Error", error.message);
        res.status(500).json({ error: 'Internal server error' });
    }
});




app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
