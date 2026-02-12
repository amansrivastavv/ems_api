const db = require("../../config/db");

exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.query("SELECT * FROM users WHERE email = ?", [email], (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
};

exports.createUser = (user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)",
      [user.name, user.email, user.password, user.role_id],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      },
    );
  });
};
