USE officeDB;

INSERT INTO departments (name)
VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO roles (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1), ("Salesperson", 80000, 1), ("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4);

INSERT INTO employees (id, first_name, last_name, role_id)
VALUES (1, "Leslie", "Knoope", 4), (2, "Ron", "Swanson", 7), (3, "April", "Ludgate", 1), (4, "Andy", "Dwyer", 2), (5, "Ben", "Wyatt", 5), (6, "Chris", "Traeger", 3), (7, "Gerry", "Gergich", 4), (8, "Tom","Haverford", 3);

UPDATE officedb.employees SET manager_id = 1 WHERE id = 2;

UPDATE officedb.employees SET manager_id = 2 WHERE id = 3;



