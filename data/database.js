// Import a library called 'dotenv' to read the .env file
require('dotenv').config();

// Create a constant variable named MongoClient and set it equal to require('mongodb').MongoClient
const { MongoClient } = require('mongodb');

// Declare a variable named db
let db;

// Function to initialize the database connection
const initDb = (callback) => {
    if (db) {
        console.log("Database is already initialized!");
        return callback(null, db);
    }

    MongoClient.connect(process.env.MONGODB_URI)
        .then((client) => {
            db = client.db(); // Ensure the correct database object is stored
            console.log("Database initialized successfully!");
            callback(null, db);
        })
        .catch((err) => {
            console.error("Database initialization failed:", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!db) {
        throw new Error("Database not initialized. Call initDb first.");
    }
    return db;
};

// Export the initDb and getDatabase functions
module.exports = {
    initDb,
    getDatabase,
};