const sqlite3 = require('sqlite3').verbose(); // Import sqlite3 library

// Connect to database (or create it if not exists)
const db = new sqlite3.Database("phishnet.db", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) console.error("Error opening database:", err);
    else console.log("Connected to SQLite database.");
});

// Create table to store scanned URLs
db.serialize(() => {
    try {
        db.run(`CREATE TABLE IF NOT EXISTS urls (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            url TEXT UNIQUE,
            safe INTEGER, 
            checked_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )`); // Create the table if it does not exist
    } catch (error) {
        console.error("Error opening database:", error); // Log the error for debugging
        console.error("Error creating table:", error); // Log the error for debugging
    }
});

module.exports = db;
