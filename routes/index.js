// Declare a constant variable named router and set it equal to require('express').Router()
const router = require("express").Router();

// Declare a constant variable named passport and set it equal to require("passport")
const passport = require("passport");

// Declare the root route
router.get("/", (req, res) => {
  res.send("Welcome to a School API of Students and Teachers");
});

// Declare the router for students
router.use("/students", require("./students"));

// Declare the router for teachers
router.use("/teachers", require("./teachers"));

// Declare the router swagger
router.use("/", require("./swagger"));

// Route for login
router.get("/login", passport.authenticate("github"), (req, res) => {});

// GitHub callback route
router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

// Export the router
module.exports = router;
