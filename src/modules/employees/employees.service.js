const repo = require("./employees.repository");

exports.getAllEmployees = async (user) => {
  // If user is Employee (role 2), they can only see their own profile
  return await repo.findAll(user.role_id, user.id);
};

exports.getEmployeeById = async (id) => {
  const employee = await repo.findById(id);
  if (!employee) {
    throw new Error("Employee not found");
  }
  return employee;
};

exports.createEmployee = async (data) => {
  return await repo.create(data);
};

exports.updateEmployee = async (id, data) => {
  return await repo.update(id, data);
};

exports.deleteEmployee = async (id) => {
  return await repo.delete(id);
};
