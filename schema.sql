DROP DATABASE IF EXISTS officeDB;

CREATE DATABASE officeDB;
USE officeDB;

CREATE TABLE department (
	id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE role (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,4),
    department_id INT,
    PRIMARY KEY(id),
	FOREIGN KEY(department_id) REFERENCES department(id)
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT,
    first VARCHAR(50),
    last VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
	FOREIGN KEY(role_id) REFERENCES role(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id)
);
