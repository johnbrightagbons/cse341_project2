// Declare a constant variable named router and set it equal to require('express').Router()
const router = require('express').Router();
const passport = require('passport');

// Declare the root route
router.get('/', (req, res) => {
    res.send('Welcome to a School API of Students and Teachers');
});

// Declare the router for students
router.use('/students', require('./students'));

// Declare the router for teachers
router.use('/teachers', require('./teachers'));

// Declare the router swagger
router.use('/', require('./swagger'));

// Route for login
router.get("/login", passport.authenticate("github", { scope: ["user:email"] }));

// GitHub callback route
router.get(
    "/github/callback",
    passport.authenticate("github", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/profile"); // Redirect to profile after successful login
    }
);

// Route for profile
router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        res.send(`Welcome to the School APP, ${req.user.username}!`);
    } else {
        res.redirect('/login');
    }
});

// Route for logout
router.get("/logout", function (req, res, next) {
    const username = req.user ? req.user.username : "User"; // Get the username if available
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.send(`${username}, you are logged out`); // Display the logout message
    });
});

// Export the router
module.exports = router;