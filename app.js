const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');

const app = express();

app.set("view engine", "ejs");

const indexRouter = require('./routes/index.js');

const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Swagger JSON
app.get('/api-docs/swagger.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
});

// Swagger UI
app.use(
    '/api-docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
);

// Existing routes//
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger is running on http://localhost:${port}/api-docs`);
});

