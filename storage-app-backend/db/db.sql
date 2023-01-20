CREATE DATABASE storage 

USE storage

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

--Creating table for employees
CREATE TABLE employees (
        id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        phone_number VARCHAR(30) NOT NULL,
        address VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        employment_date DATE NOT NULL,
        dismissal_date DATE NULL
);

INSERT INTO employees (first_name, last_name, phone_number, address, email, employment_date)
VALUES ('Muamer', 'Alickovic', '061435322', 'Zavidovici', 'am2k@gmail.com', '2022-12-12')

--Creating table for users that use employee id as reference for one to one relationship
CREATE TABLE users (
        employee_id INT REFERENCES employees(id) UNIQUE,
        username VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(255) NOT NULL
);

INSERT INTO users (employee_id, username, password, role)
VALUES (1, 'am2k', crypt('Pa$$w0rd',gen_salt('bf', 10)), 'ADMIN')

--Creating table for suppliers 
CREATE TABLE suppliers (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL,
	uid VARCHAR(255) NOT NULL,
	pdv VARCHAR(255) NOT NULL,
	phone_number VARCHAR(255) NOT NULL,
	contact_person VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	start_date DATE NOT NULL,
	end_date DATE NULL
)

--Creating table for materials 
CREATE TABLE materials (
	id INT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
	name VARCHAR(255) NOT NULL,
	amount INT NOT NULL,
	min_amount INT NOT NULL,
	price DOUBLE PRECISION NOT NULL,
	unit_of_measure VARCHAR(255) NOT NULL,
	used BOOLEAN NOT NULL,
	supplier_id INT,
	FOREIGN KEY (supplier_id) REFERENCES suppliers(id)
)