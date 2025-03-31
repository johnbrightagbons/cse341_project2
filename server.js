// Declare a constant variable named express and set it equal to require('express').
const express = require('express');
const session = require('express-session'); 
const passport = require('passport'); 
const cors = require("cors");

require('dotenv').config(); // Load environment variables from .env file

// Declare a constant variable named bodyParser and set it equal to require('body-parser').
const bodyParser = require('body-parser');
// Load passport configuration
require("./passport/passport");
require('./middleware/authenticate.js');
// Declare a constant variable named app and set it equal to express().
const app = express();

// Create a constant variable named mongodb and set it equal to require('./data/database').
const mongodb = require('./data/database');

// Declare a port variable and set it equal to 3000 to run the app
const port =process.env.PORT || 5000;

app.use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: false,
        cookie: { secure: false } 
    }))
    .use(passport.initialize())
    .use(passport.session());

// Configure CORS options
const corsOptions = {
    origin: '*', // Allow all origins
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization', 'Origin', 'X-Requested-With', 'Accept'], // Allowed headers
    optionsSuccessStatus: 200 // For legacy browsers
};

// Enable CORS with the configured options
app.use(cors(corsOptions));

// Routes setup
const routes = require("./routes/index.js");
app.use("/", routes);

app.get("/", (req, res) => {
    res.send("Welcome to a School API of Students and Teachers");
});

app.get(
    "/github/callback",
    passport.authenticate("github", {
        failureRedirect: "/api-docs",
        session: true, // Ensure session-based authentication
    }),
    (req, res) => {
        req.session.user = req.user; // Store user in session
        req.session.save(() => {
            res.redirect("/");
        });
    }
);

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