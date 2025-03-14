// Import a library called 'dotenv' to read the .env file
require('dotenv').config();

// Create a constant variable named MongoClient and set it equal to require('mongodb').MongoClient
const MongoClient = require('mongodb').MongoClient;

// Declare a variable named database
let database;

const initDb = (callback) => {
    if (database) {
        console.log("Database is already initialized");
        return callback(null, database);
    }

    // Connect to the database using the connection string
    MongoClient.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        .then((client) => { // FIXED the destructuring error
            database = client.db(); // Ensure you access the database, not just the client
            console.log("Database initialized successfully");
            callback(null, database);
        })
        .catch((err) => {
            console.error("Database connection failed", err);
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw new Error('Database is not initialized');
    }
    return database;
};



// Export the initDb and getDatabase functions
module.exports = {
    initDb,
    getDatabase
};  