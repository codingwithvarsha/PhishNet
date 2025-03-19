const sqlite3 = require("sqlite3").verbose();

// Connect to database (or create it if not exists)
const db = new sqlite3.Database("phishnet.db", (err) => {
    if (err) console.error("Error opening database:", err);
    else console.log("Connected to SQLite database.");
});

// Create table to store scanned URLs
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS urls (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE,
        safe INTEGER, 
        checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`);
});

module.exports = db;
