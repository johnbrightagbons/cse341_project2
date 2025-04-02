// Import required modules
const router = require("express").Router();
const teachersController = require("../controllers/teachers");
const { isAuthenticated } = require("../middleware/authenticate");
const { validateTeacher } = require("../middleware/validate");

// Add routes for teachers
router.get("/", teachersController.getAllTeachers);
router.get("/:id", teachersController.getSingleTeacher);
router.post(
  "/",
  isAuthenticated,
  validateTeacher,
  teachersController.createTeacher
);
router.put(
  "/:id",
  isAuthenticated,
  validateTeacher,
  teachersController.updateTeacher
);
router.delete("/:id", isAuthenticated, teachersController.deleteTeacher);

// Export the router
module.exports = router; // The router is exported so that it can be used in the server.js file
