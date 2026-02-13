const db = require("../../config/db");

exports.findAll = (role, userId) => {
  return new Promise((resolve, reject) => {
    let query = "SELECT e.*, u.name, u.email FROM employees e JOIN users u ON e.user_id = u.id";
    let params = [];

    // If role is employee (2), only show their own record
    if (role === 2) {
      query += " WHERE e.user_id = ?";
      params.push(userId);
    }

    db.query(query, params, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
};

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT e.*, u.name, u.email FROM employees e JOIN users u ON e.user_id = u.id WHERE e.id = ?";
    db.query(query, [id], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

exports.create = (data) => {
  return new Promise((resolve, reject) => {
    const query =
      "INSERT INTO employees (user_id, department, designation, salary, date_joined) VALUES (?, ?, ?, ?, ?)";
    db.query(
      query,
      [data.user_id, data.department, data.designation, data.salary, data.date_joined],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      }
    );
  });
};

exports.update = (id, data) => {
  return new Promise((resolve, reject) => {
    // Only update fields that are provided
    const fields = [];
    const values = [];
    
    if (data.department) { fields.push("department = ?"); values.push(data.department); }
    if (data.designation) { fields.push("designation = ?"); values.push(data.designation); }
    if (data.salary) { fields.push("salary = ?"); values.push(data.salary); }
    
    if (fields.length === 0) return resolve(null);

    values.push(id);
    const query = `UPDATE employees SET ${fields.join(", ")} WHERE id = ?`;

    db.query(query, values, (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};

exports.delete = (id) => {
  return new Promise((resolve, reject) => {
    const query = "DELETE FROM employees WHERE id = ?";
    db.query(query, [id], (err, result) => {
      if (err) reject(err);
      resolve(result);
    });
  });
};
