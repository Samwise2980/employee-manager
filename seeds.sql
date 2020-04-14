USE officeDB;

INSERT INTO departments (name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");


INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 1);


-- INSERT INTO employees (first, last)
-- VALUES ("Leslie", "Knoope"), ("Ron", "Swanson"), ("April", "Ludgate"), ("Andy", "Dwyer"), ("Ben", "Wyatt"), ("Chris", "Traeger"), ("Gerry", "Gergich"), ("Tom","Haverford");

INSERT INTO employees (first_name, last_name, role_id)
VALUES ("Leslie", "Knoope", 4), ("Ron", "Swanson", 7), ("April", "Ludgate", 1), ("Andy", "Dwyer", 2), ("Ben", "Wyatt", 5), ("Chris", "Traeger", 3), ("Gerry", "Gergich", 4), ("Tom","Haverford", 3);

    
SELECT * FROM departments;
SELECT * FROM roles;
SELECT * FROM employees;


SELECT employees.first_name, employees.last_name, roles.title, departments.name AS department, roles.salary, CONCAT( managers.first_name, " ", managers.last_name) AS manager 
FROM employees 
JOIN employees AS managers ON employees.manager_id = managers.id
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id;


-- WHERE managers.first_name = "Ron";