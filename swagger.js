const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My API for a School',
    description: 'School API Documentation',
  },
  host: 'localhost:5000',
  schemes: ['http', 'https']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// Generate Swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);