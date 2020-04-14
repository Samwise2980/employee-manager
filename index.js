// -- join employee to role then role to department
// -- join employee to employee

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require('console.table');

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "officeDB",
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");
  asciiArt();
  promptMain();
});

function promptMain() {
  const allEmployees = "View All Employees";
  const allEmpByDep = "View All Employees By Department";
  const allEmpbyManager = "View All Employees By Manager";
  const addEmp = "Add Employee";
  const rEmp = "Remove Employee";
  const updateEmprole = "Update Employee Role";
  const updateEmpManager = "Update Employee Manager";
  const viewAll = "View All Roles";
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          allEmployees,
          allEmpByDep,
          allEmpbyManager,
          addEmp,
          rEmp,
          updateEmprole,
          updateEmpManager,
          viewAll,
          "EXIT",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case allEmployees:
          viewAllEmployees();
          break;
        case allEmpByDep:
          break;
        case allEmpbyManager:
          break;
        case addEmp:
          break;
        case rEmp:
          break;
        case updateEmprole:
          break;
        case updateEmpManager:
          break;
        case viewAll:
          break;
        default:
          connection.end();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}

function viewAllEmployees() {
  connection.query("SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees JOIN employees AS managers ON employees.manager_id = managers.id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    promptMain();
  });
}

function viewAllEmployeesDepartment() {
  connection.query("", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    const items = res.map((row) => {
      return {
        name: row.name,
        value: row.id,
      };
    });
    inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "What would you like to do?",
        choices: [
          allEmployees,
          allEmpByDep,
          allEmpbyManager,
          addEmp,
          rEmp,
          updateEmprole,
          updateEmpManager,
          viewAll,
          "EXIT",
        ],
      },
    ])
    .then((answers) => {
      switch (answers.choice) {
        case allEmployees:
          viewAllEmployees();
          break;
        case allEmpByDep:
          break;
        case allEmpbyManager:
          break;
        case addEmp:
          break;
        case rEmp:
          break;
        case updateEmprole:
          break;
        case updateEmpManager:
          break;
        case viewAll:
          break;
        default:
          connection.end();
      }
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });

    promptMain();
  });
}

function postPrompt() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is the employees first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is the employees last name?",
      },
      {
        type: "list",
        name: "role",
        message: "What is the employees role?",
        choices: ["Fighter", "Ranger", "Wizard"],
      },
      {
        type: "list",
        name: "manager",
        message: "Who is the employees manager?",
        choices: ["",],
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO products SET ?",
        {
          name: answers.first,
          category: answers.last,
          starting_bid: answers.bidAmount,
          current_bid: answers.bidAmount,
        },
        (err, res) => {
          if (err) {
            throw err;
          }
          promptAction();
        }
      );    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}


function asciiArt() {
  console.log(`
=-----------------------------------------------------------------------------------------------------------------------------------------------=
|   _______  __   __  _______  ___      _______  __   __  _______  _______    _______  ______    _______  _______  ___   _  _______  ______     |
|  |    ___||  |_|  ||    _  ||   |    |   _   ||  | |  ||    ___||    ___|  |_     _||   | ||  |   _   ||       ||   |_| ||    ___||   | ||    |
|  |   |___ |       ||   |_| ||   |    |  | |  ||  |_|  ||   |___ |   |___     |   |  |   |_||_ |  |_|  ||       ||      _||   |___ |   |_||_   |
|  |    ___||       ||    ___||   |___ |  |_|  ||_     _||    ___||    ___|    |   |  |    __  ||       ||      _||     |_ |    ___||    __  |  |
|  |   |___ | ||_|| ||   |    |       ||       |  |   |  |   |___ |   |___     |   |  |   |  | ||   _   ||     |_ |    _  ||   |___ |   |  | |  |
|  |_______||_|   |_||___|    |_______||_______|  |___|  |_______||_______|    |___|  |___|  |_||__| |__||_______||___| |_||_______||___|  |_|  |
|                                                                                                                                               |
=-----------------------------------------------------------------------------------------------------------------------------------------------=
  `);
}
