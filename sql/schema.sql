CREATE DATABASE IF NOT EXISTS devapi_db;
USE devapi_db;

-- Users Table (for Authentication)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    role_id INT DEFAULT 2, -- 1: Admin, 2: Employee
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Employees Table (for Employee Details)
CREATE TABLE IF NOT EXISTS employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    department VARCHAR(100),
    designation VARCHAR(100),
    salary DECIMAL(10, 2),
    date_joined DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
