var inquirer = require("inquirer")
require("console.table")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employeedb'
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);


    function start() {

        inquirer.prompt([
            {
                type: "list",
                name: "userChoice",
                message: "What would you like to do?",
                choices: [
                    "Add employee", "View employee", "Remove employee", "Add department", "View department", "Remove department", "Add role", "View role", "Remove role"
                ]
            }
        ])
            .then(function (answers) {
                console.log(answers)

                if (answers.userChoice === "Add employee") {
                    addEmployee()
                }
                if (answers.userChoice === "View employee") {
                    viewAllEmployees()
                }
                if (answers.userChoice === "Remove employee") {
                    removeEmployee()
                }
                if (answers.userChoice === "Add department") {
                    addDepartment()
                }
                if (answers.userChoice === "View department") {
                    viewAllDepartments()
                }
                if (answers.userChoice === "Remove department") {
                    removeDepartment()
                }
                if (answers.userChoice === "Add role") {
                    addRole()
                }
                if (answers.userChoice === "View role") {
                    viewAllRoles()
                }
                if (answers.userChoice === "Remove role") {
                    removeRole()
                }
            }
            )
    }

    function addEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?",
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?",
            },
            {
                type: "input",
                name: "roleID",
                message: "What is the employee's ID?",
            },
            {
                type: "input",
                name: "managerID",
                message: "What is the employee's manager's ID?",
            }
        ])
            .then(function (answers) {
                var q = `insert into employees (first_name, last_name, role_id, manager_id) values ("${answers.firstName}", "${answers.lastName}", ${answers.roleID}, ${answers.managerID})`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("employee added!");
                    start()
                });
            })
    }
    function viewAllEmployees() {
        connection.query('Select * from employees', function (error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
        });
    }
    function removeEmployee() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the employee id you would like to remove?"
            },
        ])

            .then(function (answers) {
                console.log(answers.id)
                var q = `delete from employees where id = ${answers.id};`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("employee added!");
                    start()
                });
            }
            )
    }

    // // roles
    function addRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the employee's title?",
            },
            {
                type: "input",
                name: "salary",
                message: "What is the employee's salary?",
            },
            {
                type: "input",
                name: "departmentID",
                message: "What is the employee's department ID?",
            }
        ])
            .then(function (answers) {
                var q = `insert into role (title, salary, department_id) values ("${answers.title}", ${answers.salary}, ${answers.departmentID})`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("role added!");
                    start()
                });
            })
    }
    function viewAllRoles() {
        connection.query('Select * from role', function (error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
        });
    }
    function removeRole() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the role id you would like to remove?"
            },
        ])

            .then(function (answers) {
                console.log(answers.id)
                var q = `delete from role where id = ${answers.id};`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("role removed!");
                    start()
                });
            }
            )
    }

    // departments
    function addDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "name",
                message: "What is the department's name?",
            },
        ])
            .then(function (answers) {
                var q = `insert into department (name) values ("${answers.name}")`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("department added!");
                    start()
                });
            })
    }
    function viewAllDepartments() {
        connection.query('Select * from department', function (error, results, fields) {
            if (error) throw error;
            console.table(results);
            start()
        });
    }
    function removeDepartment() {
        inquirer.prompt([
            {
                type: "input",
                name: "id",
                message: "What is the department id you would like to remove?"
            },
        ])

            .then(function (answers) {
                console.log(answers.id)
                var q = `delete from department where id = ${answers.id};`
                console.log(q);
                connection.query(q, function (error, results, fields) {
                    if (error) throw error;
                    console.log("department added!");
                    start()
                });
            }
            )
    }


    start()
});