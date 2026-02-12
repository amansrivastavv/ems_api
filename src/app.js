const express = require("express");
const app = express();

app.use(express.json());

// IMPORTANT LINE
app.use("/api/v1", require("./routes/v1"));

app.get("/test", (req, res) => {
  res.json({ message: "Test route working" });
});

module.exports = app;
