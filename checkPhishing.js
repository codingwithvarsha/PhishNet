const db = require('./database'); // Import the database connection
const { analyzeTextHeuristics } = require('./NLP'); // Import the NLP function


async function checkPhishing(url) {
    // Check the URL using heuristic analysis
    const isSuspicious = analyzeTextHeuristics(url);

    try {
        // Log the result in the database
        const safe = isSuspicious ? 0 : 1;
        await db.run(`INSERT INTO urls (url, safe) VALUES (?, ?)`, [url, safe]);
    } catch (error) {
        console.error("Database error:", error); // Log the error for debugging
        throw new Error('Failed to log URL in the database');
    }

    return { isPhishing: isSuspicious };
}

module.exports = checkPhishing;
