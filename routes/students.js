// Add Express Router
const express = require('express');
const router = express.Router();
const studentsController = require('../controllers/students');

// Add Routes for Students
router.get('/', studentsController.getAllStudents); // Get all students
router.get('/:id', studentsController.getSingleStudent); // Get student by ID
router.post('/', studentsController.createStudent); // Create a student
router.put('/:id', studentsController.updateStudent); // Update a student
router.delete('/:id', studentsController.deleteStudent); // Delete a student

// Export the router
module.exports = router;