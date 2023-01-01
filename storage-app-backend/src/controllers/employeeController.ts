import { StatusCodes } from 'http-status-codes';

import client from '../db/database.js';
import bcrypt from 'bcrypt'

const addEmployee = async (req:any, res:any) => {
    try {
        const sentEmployee = req.body;

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
        res.status(StatusCodes.BAD_REQUEST).json({message: 'Input data invalid', timestamp: new Date()})
    }
}

export default addEmployee;