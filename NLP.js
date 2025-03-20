Modify server.js:

const natural = require("natural");
const tokenizer = new natural.WordTokenizer();

function analyzeTextHeuristics(url) {
    const phishingKeywords = ["login", "secure", "verify", "account", "update", "confirm", "bank"];
    const words = tokenizer.tokenize(url);
    return words.some(word => phishingKeywords.includes(word.toLowerCase()));
}

app.post("/analyze-url", (req, res) => {
    const { url } = req.body;
    const suspicious = analyzeTextHeuristics(url);
    return res.json({ suspicious });
});
