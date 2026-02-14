const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");


const swaggerOptions = {
  customCssUrl: "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui.min.css",
  customJs: [
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-bundle.js",
    "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.0.0/swagger-ui-standalone-preset.js",
  ],
};

const morgan = require("morgan");

// Use morgan for logging HTTP requests
const logFormat = process.env.NODE_ENV === "production" ? "combined" : "dev";
app.use(morgan(logFormat));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerOptions));


app.use(express.json());

app.get("/", (req, res) => {
  res.send(`
    <h1>Welcome to Employee Management System API</h1>
    <p>Documentation available at <a href="/api-docs">/api-docs</a></p>
  `);
});

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

// IMPORTANT LINE
app.use("/api/v1", require("./routes/v1"));

app.get("/", (req, res) => {
  res.send("Welcome to Employee Management System API");
});

app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

module.exports = app;
