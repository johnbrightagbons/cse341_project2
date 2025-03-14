// Declare a constant variable named express and set it equal to require('express').
const express = require('express');

// Create a constant variable named mongodb and set it equal to require('./data/database').
const mongodb = require('./data/database');

// Declare a constant variable named app and set it equal to express().
const app = express();


// CORS Middleware 
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Z-key');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});


// Declare a constant variable named bodyParser and set it equal to require('body-parser').
const bodyParser = require('body-parser');


// Declare a port variable and set it equal to 3000 to run the app
const port =process.env.PORT || 5000;

// Call body-parser to parse incoming requests
app.use(bodyParser.json());


// Routes set up
app.use('', require ('./routes'));

// Connect to the database using mongodb function
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        // Start the app,  a server that browsers can connect to
        app.listen(port, () => {
            console.log(`Database is Listening and Node is Running on Port ${port}`);
        });
    }
});