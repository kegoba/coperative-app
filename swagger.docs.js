require("dotenv").config();

const swaggerJSDoc = require("swagger-jsdoc");
// require("./routes/pet.route")

const { PORT } = process.env;

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Pet Store API",
    version: "1.0.0",
    description: "API documentation for Our Amazing Pet Store"
  },
  servers: [
    {
      url: `http://localhost:${PORT}`,
      description: "Development server"
    }
  ]
};

const options = {
  swaggerDefinition,
  apis: ["./routes/owner.route.js"]
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
