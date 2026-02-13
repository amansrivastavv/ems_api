const express = require("express");
const router = express.Router();

router.use("/auth", require("../../modules/auth/auth.routes"));
router.use("/employees", require("../../modules/employees/employees.routes"));

module.exports = router;
