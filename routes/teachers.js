// Add express
const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');
const { isAuthenticated } = require("../middleware/authenticate");
// Add routes
router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getSingleTeacher);
router.post('/', isAuthenticated, teachersController.createTeacher);
router.put('/:id', isAuthenticated, teachersController.updateTeacher);
router.delete('/:id', isAuthenticated, teachersController.deleteTeacher);

// Export the router
module.exports = router;  // The router is exported so that it can be used in the server.js file