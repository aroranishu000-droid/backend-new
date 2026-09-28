const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",

        info: {
            title: "My Node.js API",
            version: "1.0.0",
            description: "API documentation for my Node.js backend"
        },

        servers: [
            {
                url: "http://localhost:3001"
            }
        ]
    },

    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;