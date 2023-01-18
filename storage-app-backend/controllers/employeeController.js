const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const ROLES_LIST = require('../config/roles_list');

const addEmployee = async (req, res) => {
  const errors = validationResult(req);
  try {
    const sentEmployee = req.body;

    if (!errors.isEmpty()) {
      return res
        .status(StatusCodes.UNPROCESSABLE_ENTITY)
        .json({ errors: errors.array() });
    }

    const userExists = await client.query(
      'SELECT COUNT(*) FROM employees WHERE email = $1',
      [sentEmployee.email]
    );

    if (userExists.rows[0].count > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'Employee already exists with email: ' + sentEmployee.email,
        timestamp: new Date(),
      });
    }

    const usernameExists = await client.query(
      'SELECT COUNT(*) FROM users WHERE username = $1',
      [sentEmployee.username]
    );

    if (usernameExists.rows[0].count > 0) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        message: 'User already exists with username: ' + sentEmployee.username,
        timestamp: new Date(),
      });
    }

    const salt = await bcrypt.genSalt(10);

    const employeePassword = await bcrypt.hash(sentEmployee.password, salt);

    const newEmployee = await client.query(
      'INSERT INTO employees (first_name, last_name, phone_number, address, email, employment_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [
        sentEmployee.firstName,
        sentEmployee.lastName,
        sentEmployee.phoneNumber,
        sentEmployee.address,
        sentEmployee.email,
        sentEmployee.employmentDate,
      ]
    );

    const employeeResponse = newEmployee.rows[0];

    const newUser = await client.query(
      'INSERT INTO users (employee_id, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        employeeResponse.id,
        sentEmployee.username,
        employeePassword,
        ROLES_LIST.User,
      ]
    );

    const userResponse = newUser.rows[0];

    res.status(StatusCodes.CREATED).json({ employeeResponse, userResponse });
  } catch (error) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: error.message, timestamp: new Date() });
  }
};

const getEmployees = async (req, res) => {
  try {
    const fetchedEmployees = await client.query(
      'SELECT * FROM employees e INNER JOIN users u ON u.employee_id = e.id'
    );

    const listOfEmployees = [...fetchedEmployees.rows];

    res.status(StatusCodes.OK).json({ listOfEmployees });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

const getEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const fetchedEmployees = await client.query(
      'SELECT * FROM employees e INNER JOIN users u ON u.employee_id = e.id WHERE id = $1',
      [employeeId]
    );

    const requestedEmployee = fetchedEmployees.rows[0];

    if (!requestedEmployee) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with id: ' + employeeId });
    }

    res.status(StatusCodes.OK).json({ requestedEmployee });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

const updateEmployee = async (req, res) => {
  const employeeId = req.params.employeeId;

  try {
    const fetchedEmployees = await client.query(
      'SELECT * FROM employees e INNER JOIN users u ON u.employee_id = e.id WHERE id = $1',
      [employeeId]
    );

    const requestedEmployee = fetchedEmployees.rows[0];

    if (!requestedEmployee) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with id: ' + employeeId });
    }

    const updateData = req.body;

    let userPassword = requestedEmployee.password;

    if (!(await bcrypt.compare(updateData.password, userPassword))) {
      const salt = await bcrypt.genSalt(10);

      userPassword = await bcrypt.hash(updateData.password, salt);
    }

    const updatedEmployee = await client.query(
      'UPDATE employees SET first_name = $1, last_name = $2, phone_number = $3, address = $4, email = $5, employment_date = $6, dismissal_date = $7 WHERE id = $8  RETURNING *;',
      [
        updateData.firstName,
        updateData.lastName,
        updateData.phoneNumber,
        updateData.address,
        updateData.email,
        updateData.employmentDate,
        updateData.dismissalDate,
        employeeId,
      ]
    );

    const updatedUser = await client.query(
      'UPDATE users SET username = $1, password = $2 WHERE employee_id = $3 RETURNING *;',
      [updateData.username, userPassword, employeeId]
    );

    const response = {
      employee: updatedEmployee.rows[0],
      user: updatedUser.rows[0],
    };
    res.status(StatusCodes.OK).json({ response });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

module.exports = { addEmployee, getEmployees, getEmployee, updateEmployee };
