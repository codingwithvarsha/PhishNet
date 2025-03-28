const natural = require('natural');
const WordTokenizer = natural.WordTokenizer;
const tokenizer = new WordTokenizer();

function analyzeTextHeuristics(url) {
    const phishingKeywords = ["login", "secure", "verify", "account", "update", "confirm", "bank"];
    const words = tokenizer.tokenize(url);
    return words.some(word => phishingKeywords.includes(word.toLowerCase()));
}

module.exports = { analyzeTextHeuristics };
