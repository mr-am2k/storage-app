CREATE DATABASE storage 

USE storage

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

--Creating table for users that use employee id as reference for one to one relationship
CREATE TABLE users (
        employee_id INT REFERENCES employees(id) UNIQUE,
        username VARCHAR(255) NOT NULL,,
        password VARCHAR(255 NOT NULL,,
        role VARCHAR(255) NOT NULL
);
