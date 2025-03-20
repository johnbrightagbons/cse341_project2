// Declare Router
const router = require('express').Router();

// Declare Swagger UI
const swaggerUi = require('swagger-ui-express');

//Declare Swagger Document
const swaggerDocument = require('../swagger.json');

// Call Routes
router.use('/api-docs', swaggerUi.serve);
router.get('/api-docs', swaggerUi.setup(swaggerDocument));

// Export the router
module.exports = router;  // The router is exported so that it can be used in the server.js file