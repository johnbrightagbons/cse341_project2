// Declare a constant variable named express and set it equal to require('express').
const express = require("express");
// Declare a constant variable named bodyParser and set it equal to require('body-parser').
const bodyParser = require("body-parser");
require("dotenv").config(); // Load environment variables from .env file
// Create a constant variable named mongodb and set it equal to require('./data/database').
const { initDb } = require("./data/database");
const passport = require("passport"); // Load passport configuration
const session = require("express-session"); // Load express-session for session management
const GitHubStrategy = require("passport-github2").Strategy; // Load GitHub strategy for authentication
const cors = require("cors");

// Declare a port variable and set it equal to 3000 to run the app
const port = process.env.PORT || 5000;

// Declare a constant variable named app and set it equal to express().
const app = express();

app
  .use(bodyParser.json()) // Parse JSON request bodies
  .use(
    session({
      secret: "secret", // Secret key for session
      resave: false, // Don't resave session if unmodified
      saveUninitialized: true, // Save uninitialized sessions
    })
  )

  // Initialize Passport.js
  .use(passport.initialize())
  .use(passport.session())

  .use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
  })
  .use(
    cors({
      methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    })
  )
  .use(cors()); // Allow all origins
// Or restrict to specific origins
// app.use(cors({ origin: "https://your-frontend-domain.com" }));

//app.get("/", (req, res) => {
//res.send("Welcome to a School API of Students and Teachers");
//});

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.GITHUB_CALLBACK_URL,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log("GitHub Profile:", profile); // Log the profile information
      return done(null, profile);
    }
  )
);

// Middleware to check if user is authenticated
passport.serializeUser((user, done) => {
  done(null, user);
});
// Middleware to deserialize user from session
// This is called when a request is made to the server after login
passport.deserializeUser((user, done) => {
  done(null, user);
});

// GitHub login route
app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}, Welcome to the School API`
      : "You're Logged Out, Please Login"
  );
});
app.use("/", require("./routes/index.js")); // Use the index route for all routes

app.get(
  "/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/login",
    session: true,
  }),
  (req, res) => {
    req.session.user = req.user; // Store user information in session
    res.redirect("/");
  }
);

// Connect to the database using initDb function
initDb((err) => {
  if (err) {
    console.error("Failed to connect to the database:", err);
    process.exit(1);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  }
});
