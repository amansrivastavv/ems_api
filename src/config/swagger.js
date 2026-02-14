const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EMS API",
      version: "1.0.0",
      description: "Employee Management System API Documentation",
    },
    servers: [
      {
        url: "/api/v1",
        description: "Current Server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/modules/**/*.routes.js"], // Scan specific route files
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
