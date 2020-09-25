var inquirer = require("inquirer")
require("console.table")


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
.then(function(answers){
    console.log(answers)

    if (answers.userChoice === "Add employee"){
        addEmployee()}
    if (answers.userChoice === "View employee"){
        viewAllEmployees()}
    if (answers.userChoice === "Remove employee"){
        removeEmployee()}
    }
)

function addEmployee(){
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
}
function viewAllEmployees(){
    console.log()
}
function removeEmployee(){
    inquirer.prompt([
        {
            type: "input",
            name: "removeEmployee",
            message: "Which employee would you like to remove?"
        },
    ])
    .then(function(answers){
        console.log(answers.removeEmployee)
    }
    )
}