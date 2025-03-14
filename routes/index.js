// Declare a constant variable named router and set it equal to require('express').Router()
const router = require('express').Router();
router.get('/', (req, res) => {
    res.send('Welcome to a School API of Students and Teachers');
});



// Export the router
module.exports = router;