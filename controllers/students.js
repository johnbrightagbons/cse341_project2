// Create a Database Connection
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all students
const getAllStudents = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('students').find();
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    }).catch((err) => {
        console.error(err); // Log the error
        res.status(500).send("An error occurred while getting students");   // Send a response to the client
    }); 
};


// Get a single student by ID
const getSingleStudent = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('students').find({ _id: studentId});
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students[0]);
    }).catch((err) => {
        console.error(err); // Log the error
        res.status(500).send("An error occurred while getting a student");   // Send a response to the client
    });
};


// Create a student
const createStudent = async (req, res) => {
    if (!req.body.name || !req.body.email) {
        return res.status(400).json({ message: "Name and email are required" });
    }
    console.log("Incoming request body:", req.body); // Log the incoming request body
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
        console.log("Database insert result:", result); // Log the result of the insert operation

        if (result.acknowledged) {
            res.status(201).json({ message: 'Student created successfully' });
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
    const studentId = new ObjectId(req.params.id);
    const student = {
        name : req.body.name,
        email : req.body.email,
        age : req.body.age,
        phone : req.body.phone,
        address : req.body.address,
        course : req.body.course,
        gpa : req.body.gpa
    }
    const result = await mongodb.getDatabase().db().collection('students').updateOne({ _id: studentId }, { $set: student });
    if (result.modifiedCount >0) {
        res.status(200).json({ message: "Student updated successfully" });
    } else {
        res.status(500).send("An error occurred while updating a student");
    }
};


// Delete a student by ID
const deleteStudent = async (req, res) => {
    const studentId = new ObjectId(req.params.id);
        const result = await mongodb.getDatabase().db().collection('students').deleteOne({_id: studentId});
        if (result.deletedCount > 0) {
            res.status(200).json({ message: "Student deleted successfully" });
        } else {
            res.status(500).send("An error occurred while deleting a student");
        }
};   



// Import
module.exports = {
    getAllStudents,
    getSingleStudent,
    createStudent,
    updateStudent,
    deleteStudent
};
