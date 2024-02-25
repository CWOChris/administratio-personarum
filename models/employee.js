const mysql = require('mysql2');
const pool = require('../db/db.js');

const createEmployeeTableQ = `
    CREATE TABLE IF NOT EXISTS employee (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        role_id INT NOT NULL,
        manager_id INT,
        FOREIGN KEY (role_id) REFERENCES role(id),
        FOREIGN KEY (manager_id) REFERENCES employee(id)
    )`;

    pool.query(createEmployeeTableQ, (err, results) => {
        if (err) {
            console.error('Problem creating employee', err);
        } else {
            console.log('Employee created successfully');
        }
    });

    function addEmployee(employeeData, callback) {
        const { first_name, last_name, role_id, manager_id } = employeeData;
        const addEmployeeQ = 'INSERT INTO employee'
    }