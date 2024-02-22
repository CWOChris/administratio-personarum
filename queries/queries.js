const mysql = require('mysql2');

// Database connection details
const pool = mysql.createPool({
    // TODO: Add database connection details here
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'employee_tracker'
});

const queries = {
    createDepartment: 'INSERT INTO department (name) VALUES (?)',
    createRole: 'INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)',
    createEmployee: 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)',
    getAllDepartments: 'SELECT * FROM department',
    getAllEmployees: 'SELECT * FROM employee',
    updateEmployeeRole: 'UPDATE employee SET role_id = ? WHERE id = ?',
};

module.exports = { pool, queries };