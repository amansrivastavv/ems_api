module.exports = (requiredRole) => {
  return (req, res, next) => {
    if (req.user.role_id !== requiredRole) {
      return res.status(403).json({
        message: "Access denied",
      });
    }
    next();
  };
};
