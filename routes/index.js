// Declare a constant variable named router and set it equal to require('express').Router()
const router = require('express').Router();

// Declare the root route
router.get('/', (req, res) => {
    res.send('Welcome to a School API of Students and Teachers');
});

// Declare the router for students
router.use('/students', require('./students'));


// Declare the router for teachers
router.use('/teachers', require('./teachers'));

// Export the router
module.exports = router;