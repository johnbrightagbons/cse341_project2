const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all students
const getAllStudents = async (req, res) => {
    try {
        const result = await mongodb.getDatabase().db().collection('students').find();
        const students = await result.toArray();
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    } catch (err) {
        console.error("Error fetching students:", err);
        res.status(500).json({ message: "An error occurred while getting students" });
    }
};

// Get a single student by ID
const getSingleStudent = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid student ID format" });
        }
        const studentId = new ObjectId(req.params.id);
        const student = await mongodb.getDatabase().db().collection('students').findOne({ _id: studentId });

        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(student);
    } catch (err) {
        console.error("Error fetching student:", err);
        res.status(500).json({ message: "An error occurred while getting a student" });
    }
};

// Create a student
const createStudent = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "Name and email are required" });
    }

    const student = {
        name: req.body.name,
        email: req.body.email,
        age: req.body.age,
        phone: req.body.phone,
        address: req.body.address,
        course: req.body.course,
        gpa: req.body.gpa
    };

    try {
        const result = await mongodb.getDatabase().db().collection('students').insertOne(student);

        if (result.acknowledged) {
            res.status(201).json({ message: 'Student created successfully', id: result.insertedId });
        } else {
            res.status(500).json({ message: 'Failed to create student' });
        }
    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update a student
const updateStudent = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid student ID format" });
        }

        if (!req.body.name || !req.body.email) {
            return res.status(400).json({ message: "Name and email are required" });
        }

        const studentId = new ObjectId(req.params.id);
        const student = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age,
            phone: req.body.phone,
            address: req.body.address,
            course: req.body.course,
            gpa: req.body.gpa
        };

        const result = await mongodb.getDatabase().db().collection('students').updateOne(
            { _id: studentId },
            { $set: student }
        );

        if (result.modifiedCount > 0) {
            res.status(200).json({ message: "Student updated successfully" });
        } else {
            res.status(404).json({ message: "Student not found or no changes made" });
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "An error occurred while updating a student" });
    }
};

// Delete a student by ID
const deleteStudent = async (req, res) => {
    try {
        if (!ObjectId.isValid(req.params.id)) {
            return res.status(400).json({ message: "Invalid student ID format" });
        }

        const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').deleteOne({ _id: studentId });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "An error occurred while deleting a student" });
    }
};

module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
