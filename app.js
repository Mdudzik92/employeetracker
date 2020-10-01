var inquirer = require("inquirer")
require("console.table")
var mysql = require("mysql")
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'Earthad927!',
    database : 'employeedb'
  });

connection.connect(function(err) {
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
                "Add employee", "View employee", "Remove employee"
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
    .then(function(answers){
        connection.query(`insert into employeesdb (first_name, last_name, role_id, manager_id) values (${answers.firstName}, ${answers.lastName}, ${answers.roleID}, ${answers.managerID}) from employees`, function (error, results, fields) {
            if (error) throw error;
            console.log("employee added!");
        });
    })
}
function viewAllEmployees() {
    connection.query('Select * from employees', function (error, results, fields) {
        if (error) throw error;
        console.table(results);
    });
}
function removeEmployee() {
    inquirer.prompt([
        {
            type: "input",
            name: "removeEmployee",
            message: "Which employee would you like to remove?"
        },
    ])

        .then(function (answers) {
            console.log(answers.removeEmployee)
        }
        )
}
start()
});