// Create Database Connection
const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

// Get all teachers
// swagger.tags = ['teachers'];
const getAllTeachers = async (req, res) => {
    const result = await mongodb.getDatabase().collection('teachers').find();
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers);
    });
};


// Get Single Teacher
// swagger.tags = ['teachers'];
const getSingleTeacher = async (req, res) => {
    const teacherId = new ObjectId(req.params.id);
    const result = await mongodb.getDatabase().collection('teachers').find({_id: teacherId});
    result.toArray().then((teachers) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(teachers[0]);
    });
};

// Create Teacher
// swagger.tags = ['teachers'];
const createTeacher = async (req, res) => {
    const teacher = {
        name: req.body.name,
        department: req.body.department,
        qualification: req.body.qualification,
        salary: req.body.salary,
        courseAssigned: req.body.courseAssigned,
        age : req.body.age
    };
    const result = await mongodb.getDatabase().collection('teachers').insertOne(teacher);
    if (result.acknowledged) {
        res.status(201).json({ message: 'Teacher created successfully' });
    }
    else {
        res.status(500).json({ message: 'Failed to create teacher' });
    }
};

// Update teacher
// swagger.tags = ['teachers'];
const updateTeacher = async (req, res) => {
    const teacherId = new ObjectId(req.params.id);
    
    // Check if the teacher ID exists
    const existingTeacher = await mongodb.getDatabase().collection('teachers').findOne({_id: teacherId});
    if (!existingTeacher) {
        return res.status(404).json({ message: 'Teacher not found' });
    }

    const teacher = {
        name: req.body.name,
        department: req.body.department,
        qualification: req.body.qualification,
        salary: req.body.salary,
        courseAssigned: req.body.courseAssigned,
        age : req.body.age
    };
    
    const result = await mongodb.getDatabase().collection('teachers').updateOne({_id: teacherId}, {$set: teacher});
    if (result.modifiedCount > 0) {
        res.status(200).json({ message: 'Teacher updated successfully' });
    } else {
        res.status(500).json({ message: 'Failed to update Teacher' });
    }
};

// Delete teacher
// swagger.tags = ['teachers'];
const deleteTeacher = async (req, res) => {  
  const teacherId = new ObjectId(req.params.id);
      const result = await mongodb.getDatabase().collection('teachers').deleteOne({_id: teacherId});
           if (result.deletedCount > 0) {   
     res.status(200).json({ message: 'Teacher deleted successfully' });
  } 
  else {    
    res.status(404).json({ message: 'Failed to delete teacher' });
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
