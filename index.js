// -- join employee to role then role to department
// -- join employee to employee

const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table");

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
          viewAllEmployeesDepartment();
          break;
        case allEmpbyManager:
          viewAllEmployeesManager();
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
  connection.query(
    "SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id",
    (err, res) => {
      if (err) {
        throw err;
      }
      console.table(res);
      promptMain();
    }
  );
}

function viewAllEmployeesDepartment() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      throw err;
    }
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
        message: "Which department would you like to see?",
        choices: items,
      },
    ])
    .then((answers) => {
      connection.query(
        "SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE departments.id = ?",
        [answers.choice],
        (err, res) => {
          if (err) {
            throw err;
          }
          console.table(res);
          promptMain();
    })})
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
  });
}

function viewAllEmployeesManager() {
  connection.query("SELECT managers.id, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id WHERE managers.id = employees.manager_id GROUP BY managers.id;", (err, res) => {
    if (err) {
      throw err;
    }
    const items = res.map((row) => {
      return {
        name: row.manager,
        value: row.id,
      };
    });
    inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Which Manager would you like to find?",
        choices: items,
      },
    ])
    .then((answers) => {
      connection.query(
        "SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE managers.id = ?;", [answers.choice], (err, res) => {
          if (err) {
            throw err;
          }
          console.table(res);
          promptMain();
    })})
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
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
