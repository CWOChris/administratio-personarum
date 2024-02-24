const inquirer = require('inquirer');
const { pool } = require('./db/db.js');
const { queries } = require('./queries/queries.js');
const Employee = require('./models/employee.js');

function mainMenu() {
    pool.query("SHOW TABLES LIKE 'department'", (err, results) => {
        if (err) {
            console.error('Error checking tables exist:', err);
            return;
        }
        if (results.length === 0) {
            pool.query(queries.createDepartmentTable, (err, results) => {
                if (err) {
                    console.error('Error creating department tables:', err);
                } else {
                    console.log('Department table created successfully.');
                }
            });
        }
    });

    pool.query("SHOW TABLES LIKE 'employee'", (err, results) => {
        if (err) {
            console.error('Error checking tables exist:', err);
            return;
        }
        if (results.length === 0) {
            pool.query(queries.createEmployeeTable, (err, results) => {
                if (err) {
                    console.error('Error creating employee tables:', err);
                } else {
                    console.log('Employee table created successfully.');
                }
            });
        }
    });

    pool.query("SHOW TABLES LIKE 'roles'", (err, results) => {
        if (err) {
            console.error('Error checking tables exist:', err);
            return;
        }
        if (results.length === 0) {
            pool.query(queries.createRolesTable, (err, results) => {
                if (err) {
                    console.error('Error creating roles tables:', err);
                } else {
                    console.log('Roles table created successfully.');
                }
            });
        }
    });

    inquirer
        .prompt({
            type: 'list',
            name: 'action',
            message: 'What do you want to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Exit'
            ]
        })
        .then(answer =>{
            switch (answer.action) {
                case 'View All Departments':
                    pool.query(queries.getAllDepartments, (err, results) => {
                        if (err) {
                            console.error('Error receiving departments:', err);
                            mainMenu();
                        } else {
                            console.table(results);
                            mainMenu();
                        }
                    });
                    break;
                    // TODO: ADD, UPDATE, DELETE functionalities
                case 'View All Roles':
                    pool.query(queries.getAllRoles, (err, results) => {
                        if (err) {
                            console.error('Error receiving all roles:', err);
                            mainMenu();
                        } else {
                            console.table(results);
                            mainMenu();
                        }
                    });
                    break;
                case 'View All Employees':
                    pool.query(queries.getAllEmployees, (err, results) => {
                        if (err) {
                            console.error('Error receiving all employees:', err);
                            mainMenu();
                        } else {
                            console.table(results);
                            mainMenu();
                        }
                    });
                    break;
                    // TODO: Create ADD functionality
                case 'Add a Department':
                    addDepartment();
                    break;
                case 'Add a Role':
                    addRole();
                    break;
                case 'Add an Employee':
                    addEmployee();
                    break;
                case 'Update an Employee Role':
                    updateRole();
                    break;

                    // TODO: Add exit/loggoff
                case 'Exit':
                    console.log('Bye!');
                    pool.end();
                    break;
                default:
                    console.log('Invalid response, try again.');
                    mainMenu();
            }
        });
}

function addDepartment() {
    inquirer.prompt({
        type: 'input',
        name: 'name',
        message: 'What is the name of the department?'
    }).then(answer => {
        pool.query(queries.createDepartment, [answer.name], (err, results) => {
            if (err) {
                console.error('Problem adding Department:', err);
            } else {
                console.log('Department added successfully.');
            }
            mainMenu();
        });
    });
}

function addRole() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'title',
            message: 'What is the title of the role?'
        },
        {
            type: 'input',
            name: 'salary',
            message: 'What is the salary of the role?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department ID of the role?'
        }
    ]).then(answer => {
        pool.query(queries.createRole, [answer.title, answer.salary, answer.department_id], (err, results) => {
            if (err) {
                console.error('Problem adding Role:', err);
            } else {
                console.log('Role added successfully.');
            }
            mainMenu();
        });
    });
}

function addEmployee() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is first name of employee?'
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is last name of employee?'
        },
        {
            type: 'input',
            name: 'department_id',
            message: 'What is the department of employee?'
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Who is the employee manager?'
        }
    ]).then(answer =>{
        pool.query(queries.createEmployee, [answer.first_name, answer.last_name, answer.department_id, answer.manager_id], (err, results) => {
            if (err) {
                console.error('Problem adding employee:', err);
            } else {
                console.log('Employee successfully added.');
            }
            mainMenu();
        });
    });
}

function updateRole() {
    //TODO: Add functionality to update employee role
    inquirer.prompt([
        {
            type: 'input',
            name: 'employee_id',
            message: 'Enter ID of employee you wish to update role for:'
        },
        {
            type: 'input',
            name: 'new_role_id',
            message: 'Enter ID of new role of employee:'
        }
    ]).then(answer => {
        pool.query(queries.updateRole, [answer.new_role_id, answer.employee_id], (err, results) => {
            if (err) {
                console.error('Problem updating role of employee:', err);
            } else {
                console.log('Employee role updated.');
            }
            mainMenu();
        });
    });
}

mainMenu();