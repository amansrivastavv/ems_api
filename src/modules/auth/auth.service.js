const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const repo = require("./auth.repository");

exports.register = async (data) => {
  const existingUser = await repo.findUserByEmail(data.email);
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  const user = await repo.createUser({
    ...data,
    password: hashedPassword,
  });

  return user;
};

exports.login = async (email, password) => {
  const user = await repo.findUserByEmail(email);
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid credentials");
  }

  const token = jwt.sign(
    { id: user.id, role_id: user.role_id },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
  );

  return { token };
};
