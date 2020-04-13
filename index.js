// -- join employee to role then role to department
// -- join employee to employee

const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "password",
  database: "great_bayDB",
});
connection.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("connected as id " + connection.threadId + "\n");
  // promptAction();
});

