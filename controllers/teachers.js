// Create Database Connection
const mongodb = require("../data/database");
const { ObjectId } = require("mongodb");
//const isAuthenticated = require("../middleware/authenticate");
// Middleware to check authentication

// Get all teachers
const getAllTeachers = async (req, res) => {
  try {
    const result = await mongodb.getDatabase().collection("teachers").find();

    const teachers = await result.toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teachers);
  } catch (error) {
    console.error("Error fetching teachers:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting teachers" });
  }
};

// Get Single Teacher
const getSingleTeacher = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid teacher ID format" });
    }

    const teacherId = new ObjectId(req.params.id);
    const teacher = await mongodb
      .getDatabase()
      .collection("teachers")
      .findOne({ _id: teacherId });

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(teacher);
  } catch (error) {
    console.error("Error fetching teacher:", error);
    res
      .status(500)
      .json({ message: "An error occurred while getting the teacher" });
  }
};

// Create Teacher
const createTeacher = async (req, res) => {
  if (!req.body.name || !req.body.department) {
    return res
      .status(400)
      .json({ message: "Name and department are required" });
  }

  console.log("Incoming request body:", req.body);
  const teacher = {
    name: req.body.name,
    department: req.body.department,
    qualification: req.body.qualification,
    salary: req.body.salary,
    courseAssigned: req.body.courseAssigned,
    age: req.body.age,
  };

  try {
    const result = await mongodb
      .getDatabase()
      .db()
      .collection("teachers")
      .insertOne(teacher);
    console.log("Database insert result:", result);

    if (result.acknowledged) {
      res.status(201).json({
        message: "Teacher created successfully",
        id: result.insertedId,
      });
    } else {
      res.status(500).json({ message: "Failed to create teacher" });
    }
  } catch (error) {
    console.error("Database Insert Error:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Update teacher
const updateTeacher = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid teacher ID format" });
    }

    if (!req.body.name || !req.body.department) {
      return res
        .status(400)
        .json({ message: "Name and department are required" });
    }

    const teacherId = new ObjectId(req.params.id);
    const teacher = {
      name: req.body.name,
      department: req.body.department,
      qualification: req.body.qualification,
      salary: req.body.salary,
      courseAssigned: req.body.courseAssigned,
      age: req.body.age,
    };

    const result = await mongodb
      .getDatabase()
      .collection("teachers")
      .updateOne({ _id: teacherId }, { $set: teacher });

    if (result.modifiedCount > 0) {
      res.status(200).json({ message: "Teacher updated successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found or no changes made" });
    }
  } catch (error) {
    console.error("Error updating teacher:", error);
    res
      .status(500)
      .json({ message: "An error occurred while updating the teacher" });
  }
};

// Delete teacher
const deleteTeacher = async (req, res) => {
  try {
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid teacher ID format" });
    }

    // Ignore the request body for DELETE operations
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb
      .getDatabase()
      .collection("teachers")
      .deleteOne({ _id: teacherId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Teacher deleted successfully" });
    } else {
      res.status(404).json({ message: "Teacher not found" });
    }
  } catch (error) {
    console.error("Error deleting teacher:", error);
    res
      .status(500)
      .json({ message: "An error occurred while deleting the teacher" });
  }
};

// Import
module.exports = {
  getAllTeachers,
  getSingleTeacher,
  createTeacher,
  updateTeacher,
  deleteTeacher,
  //isAuthenticated,
};
