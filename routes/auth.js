const express = require("express");
const router = express.Router();
const passport = require("passport");

// GitHub OAuth callback route
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  (req, res) => {
    // Successful authentication, redirect or respond
    res.redirect("/dashboard"); // Replace with your desired redirect route
  }
);

module.exports = router;
