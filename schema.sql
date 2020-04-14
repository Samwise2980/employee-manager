DROP DATABASE IF EXISTS officeDB;

CREATE DATABASE officeDB;
USE officeDB;

CREATE TABLE departments (
	id INT AUTO_INCREMENT,
    name VARCHAR(30),
    PRIMARY KEY(id)
);

CREATE TABLE roles (
	id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL(10,0),
    department_id INT,
    PRIMARY KEY(id),
	FOREIGN KEY(department_id) REFERENCES departments(id)
);

CREATE TABLE employees (
	id INT AUTO_INCREMENT,
    first_name VARCHAR(50),
    last_name VARCHAR(50),
    role_id INT,
    manager_id INT,
    PRIMARY KEY(id),
	FOREIGN KEY(role_id) REFERENCES roles(id),
    FOREIGN KEY(manager_id) REFERENCES employees(id)
);