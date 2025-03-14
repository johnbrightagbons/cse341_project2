// Create a Database Connection
const mongodb = require('../data/database');
const ObjectId = require(mongodb).ObjectId;

// Get all students
const getAllStudents = async (req, res) => {
    const result = await mongodb.getDatabase().collection('students').find()
    result.toArray().then((students) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(students);
    }).catch((err) => {
        console.error(err); // Log the error
        res.status(500).send("An error occurred while getting students");   // Send a response to the client
    }); 
}