const express = require("express");
const router = express.Router();
const controller = require("./employees.controller");
const auth = require("../../middlewares/auth.middleware");
const role = require("../../middlewares/role.middleware");

// Get all employees (Admin sees all, Employee sees self)
router.get("/", auth, controller.getAllEmployees);

// Get specific employee
router.get("/:id", auth, controller.getEmployeeById);

// Create employee (Admin only)
router.post("/", auth, role(1), controller.createEmployee);

// Update employee (Admin only)
router.put("/:id", auth, role(1), controller.updateEmployee);

// Delete employee (Admin only)
router.delete("/:id", auth, role(1), controller.deleteEmployee);

module.exports = router;
