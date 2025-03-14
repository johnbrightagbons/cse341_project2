// Add Express Router
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

// Add Routes for Students
router.get('/', studentsController.getAllStudents);







// Export the router
module.exports = router;