const express = require("express");
const app = express();

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./config/swagger");

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

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
