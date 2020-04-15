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
  const viewDepartments = "View All Departments";
  const viewRoles = "View All Roles";
  const addDepartment = "Add New Department"
  const addRole = "Add New Role";

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
          viewDepartments,
          viewRoles,
          addDepartment,
          addRole,
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
          addEmployee();
          break;
        case rEmp:
          removeEmployee();
          break;
        case updateEmprole:
          updateEmployeeRole();
          break;
        case updateEmpManager:
          updateEmployeeManager();
          break;
        case viewDepartments:
          viewAllDepartments();
          break;
        case viewRoles:
          viewAllRoles();
          break;
        case addDepartment:
          addNewDepartment();
          break;
        case addRole:
          addNewRole();
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
          }
        );
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Something went wrong! Please try again.");
        }
      });
  });
}

function viewAllEmployeesManager() {
  connection.query(
    "SELECT managers.id, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id WHERE managers.id = employees.manager_id GROUP BY managers.id;",
    (err, res) => {
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
            "SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, ' ', managers.last_name) AS manager FROM employees LEFT JOIN employees AS managers ON employees.manager_id = managers.id JOIN roles ON employees.role_id = roles.id JOIN departments ON roles.department_id = departments.id WHERE managers.id = ?;",
            [answers.choice],
            (err, res) => {
              if (err) {
                throw err;
              }
              console.table(res);
              promptMain();
            }
          );
        })
        .catch((error) => {
          if (error.isTtyError) {
            console.log("Something went wrong! Please try again.");
          }
        });
    }
  );
}

function addEmployee() {
  connection
    .query("SELECT roles.id, roles.title FROM roles", (err, res) => {
      if (err) {
        throw err;
      }
      const roles = res.map((row) => {
        return {
          name: row.title,
          value: row.id,
        };
      });
      connection.query(
        "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS manager, employees.id FROM employees",
        (err, res) => {
          if (err) {
            throw err;
          }
          const managers = res.map((element) => {
            return {
              name: element.manager,
              value: element.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "input",
                name: "first",
                message: "What is the employees first name",
              },
              {
                type: "input",
                name: "last",
                message: "What is the employees last name",
              },
              {
                type: "list",
                name: "roleSelect",
                message: "What is their role?",
                choices: roles,
              },
              {
                type: "list",
                name: "mangerSelect",
                message: "Who is their Manager?",
                choices: managers,
              },
            ])
            .then((answers) => {
              connection.query(
                "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ( ?, ?, ?, ?)",
                [
                  answers.first,
                  answers.last,
                  answers.roleSelect,
                  answers.mangerSelect,
                ],
                (err, res) => {
                  if (err) {
                    throw err;
                  }
                  promptMain();
                }
              );
            });
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}

function removeEmployee() {
  connection.query(
    "SELECT employees.id, CONCAT(employees.first_name, ' ', employees.last_name, ' ', roles.title) AS name FROM employees JOIN roles ON employees.role_id = roles.id",
    (err, res) => {
      if (err) {
        throw err;
      }
      const employees = res.map((row) => {
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
            message: "Which Manager would you like to find?",
            choices: employees,
          },
        ])
        .then((answers) => {
          connection.query(
            "DELETE FROM employees WHERE id=?",
            [answers.choice],
            (err, res) => {
              if (err) {
                throw err;
              }
              promptMain();
            }
          );
        });
    }
  );
}

function updateEmployeeRole() {
  connection
    .query("SELECT roles.id, roles.title FROM roles", (err, res) => {
      if (err) {
        throw err;
      }
      const roles = res.map((row) => {
        return {
          name: row.title,
          value: row.id,
        };
      });
      connection.query(
        "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS name, employees.id FROM employees",
        (err, res) => {
          if (err) {
            throw err;
          }
          const employees = res.map((element) => {
            return {
              name: element.name,
              value: element.id,
            };
          });
          inquirer
            .prompt([
              {
                type: "list",
                name: "employeeSelect",
                message: "Which employee would you like to change the role of?",
                choices: employees,
              },
              {
                type: "list",
                name: "roleSelect",
                message: "Please select their new role?",
                choices: roles,
              },
            ])
            .then((answers) => {
              connection.query(
                "UPDATE `officedb`.`employees` SET `role_id` = ? WHERE (`id` = ?);",
                [answers.roleSelect, answers.employeeSelect],
                (err, res) => {
                  if (err) {
                    throw err;
                  }
                  promptMain();
                }
              );
            });
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}

function updateEmployeeManager() {
  connection
    .query(
      "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS name, employees.id FROM employees",
      (err, res) => {
        if (err) {
          throw err;
        }
        const managers = res.map((row) => {
          return {
            name: row.name,
            value: row.id,
          };
        });
        connection.query(
          "SELECT CONCAT(employees.first_name, ' ', employees.last_name) AS name, employees.id FROM employees",
          (err, res) => {
            if (err) {
              throw err;
            }
            const employees = res.map((element) => {
              return {
                name: element.name,
                value: element.id,
              };
            });
            inquirer
              .prompt([
                {
                  type: "list",
                  name: "employeeSelect",
                  message:
                    "Which employee would you like to change the manager of?",
                  choices: employees,
                },
                {
                  type: "list",
                  name: "managerSelect",
                  message: "Please select their new manager?",
                  choices: managers,
                },
              ])
              .then((answers) => {
                connection.query(
                  "UPDATE officedb.employees SET manager_id = ? WHERE id = ?;",
                  [answers.managerSelect, answers.employeeSelect],
                  (err, res) => {
                    if (err) {
                      console.log(err);

                      throw err;
                    }
                    promptMain();
                  }
                );
              });
          }
        );
      }
    )
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}

function viewAllRoles() {
  connection.query("SELECT * FROM roles", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    promptMain();
  });
}

function viewAllDepartments() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      throw err;
    }
    console.table(res);
    promptMain();
  });
}

function addNewRole() {
  connection.query("SELECT * FROM departments", (err, res) => {
    if (err) {
      throw err;
    }
    const departments = res.map((row) => {
      return {
        name: row.name,
        value: row.id,
      };
    });
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: "What is the new roles title?",
        },
        {
          type: "input",
          name: "salary",
          message: "How much will they make?",
        },
        {
          type: "list",
          name: "department_id",
          message: "Which department does it belong to.?",
          choices: departments,
        },
      ])
      .then((answers) => {
        connection.query(
          "INSERT INTO roles (title, salary, department_id) VALUES ( ?, ?, ?)",
          [answers.title, answers.salary, answers.department_id],
          (err, res) => {
            if (err) {
              throw err;
            }
            promptMain();
          }
        );
      })
      .catch((error) => {
        if (error.isTtyError) {
          console.log("Something went wrong! Please try again.");
        }
      });
  });
}

function addNewDepartment() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "name",
        message: "What is the new departments name",
      },
    ])
    .then((answers) => {
      connection.query(
        "INSERT INTO departments (name) VALUES (?)",
        [answers.name],
        (err, res) => {
          if (err) {
            throw err;
          }
          promptMain();
        }
      );
    })
    .catch((error) => {
      if (error.isTtyError) {
        console.log("Something went wrong! Please try again.");
      }
    });
}
