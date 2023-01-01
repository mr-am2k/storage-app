
const { StatusCodes } = require('http-status-codes')
const client = require("../db/database");
const bcrypt = require('bcrypt');

const addEmployee = async (req, res) => {
    try {
        const sentEmployee = req.body;

        if (
            sentEmployee.firstName === undefined ||
            sentEmployee.lastName === undefined ||
            sentEmployee.phoneNumber === undefined ||
            sentEmployee.address === undefined ||
            sentEmployee.email === undefined ||
            sentEmployee.employmentDate === undefined ||
            sentEmployee.username === undefined ||
            sentEmployee.password === undefined
        ) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Invalid input data", timestamp: new Date() });
        }

        const userExists = await client.query(
            'SELECT COUNT(*) FROM employees WHERE email = $1',
            [sentEmployee.email]
        )

        if(userExists.rows[0].count > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "Employee already exists with email: " + sentEmployee.email, timestamp: new Date() });
        }

        const usernameExists = await client.query(
            'SELECT COUNT(*) FROM users WHERE username = $1',
            [sentEmployee.username]
        )

        if(usernameExists.rows[0].count > 0){
            return res.status(StatusCodes.BAD_REQUEST).json({ message: "User already exists with username: " + sentEmployee.username, timestamp: new Date() });
        }

        const salt = await bcrypt.genSalt(10)

        const employeePassword = await bcrypt.hash(sentEmployee.password, salt)

        const newEmployee = await client.query(
            'INSERT INTO employees (first_name, last_name, phone_number, address, email, employment_date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [sentEmployee.firstName, sentEmployee.lastName, sentEmployee.phoneNumber, sentEmployee.address, sentEmployee.email, sentEmployee.employmentDate]
        );

        const employeeResponse = newEmployee.rows[0];

        const newUser = await client.query(
            'INSERT INTO users (employee_id, username, password, role) VALUES ($1, $2, $3, $4) RETURNING *',
            [employeeResponse.id, sentEmployee.username, employeePassword, 'USER']
        );

        const userResponse = newUser.rows[0];

        res.status(StatusCodes.CREATED).json({ employeeResponse, userResponse });
    } catch (error) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: error.message, timestamp: new Date() });
    }
}

module.exports = { addEmployee }