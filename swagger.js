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
                url: "https://backend-new-1-xaem.onrender.com",
        description: "Live Render Server"
            }
        ]
    },

    apis: ["./routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;