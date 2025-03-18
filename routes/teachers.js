// Add express
const express = require('express');
const router = express.Router();
const teachersController = require('../controllers/teachers');


// Add routes
router.get('/', teachersController.getAllTeachers);
router.get('/:id', teachersController.getSingleTeacher);
router.post('/', teachersController.createTeacher);
router.put('/:id', teachersController.updateTeacher);
router.delete('/:id', teachersController.deleteTeacher);


// Export the router
module.exports = router;  // The router is exported so that it can be used in the server.js file