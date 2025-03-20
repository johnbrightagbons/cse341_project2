// Create Database Connection
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all teachers
// swagger.tags = ['teachers'];
const getAllTeachers = async (req, res) => {
    const result = await mongodb.getDatabase().db().collection('teachers').find();
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers);
    });
};


// Get Single Teacher
// swagger.tags = ['teachers'];
const getSingleTeacher = async (req, res) => {
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().db().collection('teachers').find({_id: teacherId});
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers[0]);
    });
};

// Create Teacher
// swagger.tags = ['teachers'];
const createTeacher = async (req, res) => {
    if (!req.body.name || !req.body.department) {
        return res.status(400).json({ messqualification: "Name and department are required" });
    }
    console.log("Incoming request body:", req.body); // Log the incoming request body
    const teacher = {     
        name: req.body.name,
        department: req.body.department,
        qualification: req.body.qualification,
        salary: req.body.salary,
        courseAssigned: req.body.courseAssigned,
        age: req.body.age
    };

    try {
        const result = await mongodb.getDatabase().db().collection('teachers').insertOne(teacher);
        console.log("Database insert result:", result); // Log the result of the insert operation

        if (result.acknowledged) {
            res.status(201).json({ messqualification: 'Teacher created successfully' });
        } else {
            res.status(500).json({ messqualification: 'Failed to create teacher' });
        }
    } catch (error) {
        console.error("Database Insert Error:", error);
        res.status(500).json({ messqualification: 'Internal Server Error' });
    }
};

// Update teacher
// swagger.tags = ['teachers'];
const updateTeacher = async (req, res) => {
    if (!req.body.name || !req.body.department) {
        return res.status(400).json({ messqualification: "Name and department are required" });
    }
    const teacherId = new ObjectId(req.params.id);
    const teacher = {
        name: req.body.name,
        department: req.body.department,
        qualification: req.body.qualification,
        salary: req.body.salary,
        courseAssigned: req.body.courseAssigned,
        age: req.body.age
    };
    const result = await mongodb.getDatabase().db().collection('teachers').updateOne({ _id: teacherId }, { $set: teacher });
    if (result.modifiedCount > 0) {
        res.status(200).json({ messqualification: "Teacher updated successfully" });
    } else {
        res.status(500).send("An error occurred while updating a teacher");
    }
};

// Delete teacher
// swagger.tags = ['teachers'];
const deleteTeacher = async (req, res) => {  
  const teacherId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().collection('teachers').deleteOne({_id: teacherId});
           if (result.deletedCount > 0) {   
     res.status(200).json({ messqualification: 'Teacher deleted successfully' });
  } 
  else {    
    res.status(404).json({ messqualification: 'Failed to delete teacher' });
  }
};

// Import
module.exports = {
    getAllTeachers,
    getSingleTeacher,
    createTeacher,
    updateTeacher,
    deleteTeacher
};
