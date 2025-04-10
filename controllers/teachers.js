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
  const { name, department, qualification, salary, courseAssigned, age } =
    req.body;

  // Validate required fields
  if (!name || typeof name !== "string" || name.trim() === "") {
    return res.status(400).json({ message: "Invalid or missing 'name' field" });
  }
  if (
    !department ||
    typeof department !== "string" ||
    department.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'department' field" });
  }
  if (
    !qualification ||
    typeof qualification !== "string" ||
    qualification.trim() === ""
  ) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'qualification' field" });
  }
  if (salary && (isNaN(Number(salary)) || Number(salary) < 0)) {
    return res.status(400).json({ message: "Invalid 'salary' field" });
  }
  if (age && (isNaN(Number(age)) || Number(age) <= 0)) {
    return res.status(400).json({ message: "Invalid 'age' field" });
  }

  const teacher = {
    name,
    department,
    qualification,
    salary: salary ? Number(salary) : undefined,
    courseAssigned: courseAssigned || undefined,
    age: age ? Number(age) : undefined,
  };

  try {
    const result = await mongodb
      .getDatabase()
      .collection("teachers")
      .insertOne(teacher);

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
    // Validate teacher ID format
    if (!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid teacher ID format" });
    }

    // Proceed with deleting the teacher from the database
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
