module.exports = (err, req, res, next) => {
  console.error(err.stack); // Log error stack for debugging

  if (err.message === "Email already exists") {
    return res.status(409).json({ message: "User already exists" });
  }

  if (err.message === "Invalid credentials") {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Default error
  res.status(500).json({
    message: "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err.message : undefined,
  });
};
