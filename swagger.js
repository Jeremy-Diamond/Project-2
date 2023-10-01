// to run use node swagger.js

const swaggerAutoGen = require('swagger-autogen')();

const doc = {
    info: {
        title: "CIT341 Project 2 API",
        description: "This is the API for Hogwarts School of Witchcraft and Wizardry.",
    },
    host: "localhost:3000",
    schemes: ['http']
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

//generate swagger.json
swaggerAutoGen(outputFile, endpointsFiles, doc);