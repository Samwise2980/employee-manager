USE officeDB;

INSERT INTO employees (id, first, last, manager_id)
VALUES (1, "Leslie", "Knoope", null),(2, "Ron", "Swanson", 1),(3, "April", "Ludgate", 1),(4, "Andy", "Dwyer", 2);
    
SELECT * FROM employees;

SELECT employees.first, employees.last, managers.first AS manager_first FROM employees JOIN employees AS managers ON employees.manager_id = managers.id WHERE managers.first = "Ron";