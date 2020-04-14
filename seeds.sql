USE officeDB;

INSERT INTO departments (name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Leslie", "Knoope", 4), ("Ron", "Swanson", 7), ("April", "Ludgate", 1), ("Andy", "Dwyer", 2), ("Ben", "Wyatt", 5), ("Chris", "Traeger", 3), ("Gerry", "Gergich", 4), ("Tom","Haverford", 3);

-- Individual table selection 
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;

-- Selects all the selected data and joins all three tables 
SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, " ", managers.last_name) AS manager 
FROM employees 
LEFT JOIN employees AS managers ON employees.manager_id = managers.id
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;

-- Selects all the selected data by department id 
SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, " ", managers.last_name) AS manager 
FROM employees
LEFT JOIN employees AS managers ON employees.manager_id = managers.id
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
WHERE departments.id = ?;

-- selects the managers from the employees table and displays their full name and id
SELECT managers.id, CONCAT( managers.first_name, " ", managers.last_name) AS manager 
FROM employees
LEFT JOIN employees AS managers ON employees.manager_id = managers.id
WHERE managers.id = employees.manager_id
GROUP BY managers.id;

-- Selects all the selected data by manager id 
SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, " ", managers.last_name) AS manager 
FROM employees
LEFT JOIN employees AS managers ON employees.manager_id = managers.id
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
WHERE managers.id = ?;

