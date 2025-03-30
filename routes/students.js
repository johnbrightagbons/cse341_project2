// Add Express Router
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');
const { isAuthenticated } = require("../middleware/authenticate");
const { isValidated } = require("../middleware/validate");

// Add Routes for Students
router.get('/', studentsController.getAllStudents); // Get all students
router.get('/:id', studentsController.getSingleStudent); // Get student by ID
router.post('/', isAuthenticated, isValidated, studentsController.createStudent); // Create a student
router.put('/:id', isAuthenticated, isValidated, studentsController.updateStudent); // Update a student
router.delete('/:id', isAuthenticated, studentsController.deleteStudent); // Delete a student

// Export the router
module.exports = router;