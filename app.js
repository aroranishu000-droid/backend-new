
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

// Main homepage — FIX for Cannot GET /
app.get("/", (req, res) => {
    res.status(200).send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>My Node.js Backend</title>
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    padding: 60px 20px;
                    background: #f4f7fb;
                }
                .card {
                    background: white;
                    padding: 35px;
                    border-radius: 12px;
                    max-width: 600px;
                    margin: auto;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.08);
                }
                a {
                    display: inline-block;
                    margin: 10px;
                    padding: 12px 20px;
                    background: #2563eb;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                }
            </style>
        </head>
        <body>
            <div class="card">
                <h1>Backend Server is Running!</h1>
                <p>Your Node.js and Express backend is online.</p>
                <a href="/api-docs">Open Swagger API Docs</a>
                <a href="/getdata">View Student Data</a>
            </div>
        </body>
        </html>
    `);
});

// Existing routes — keep all your APIs
app.use('/', indexRouter);

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Swagger is running on http://localhost:${port}/api-docs`);
});