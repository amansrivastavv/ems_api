const service = require("./employees.service");

exports.getAllEmployees = async (req, res, next) => {
  try {
    const employees = await service.getAllEmployees(req.user);
    res.json(employees);
  } catch (err) {
    next(err);
  }
};

exports.getEmployeeById = async (req, res, next) => {
  try {
    const employee = await service.getEmployeeById(req.params.id);
    res.json(employee);
  } catch (err) {
    next(err);
  }
};

exports.createEmployee = async (req, res, next) => {
  try {
    await service.createEmployee(req.body);
    res.status(201).json({ message: "Employee created successfully" });
  } catch (err) {
    next(err);
  }
};

exports.updateEmployee = async (req, res, next) => {
  try {
    await service.updateEmployee(req.params.id, req.body);
    res.json({ message: "Employee updated successfully" });
  } catch (err) {
    next(err);
  }
};

exports.deleteEmployee = async (req, res, next) => {
  try {
    await service.deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (err) {
    next(err);
  }
};
