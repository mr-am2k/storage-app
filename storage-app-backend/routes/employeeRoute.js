const express = require('express')
const { addEmployee } = require('../controllers/employeeController.js')
const { body } = require('express-validator')

const router = express.Router()

router.post('/add',
    body('firstName').not().isEmpty().trim().withMessage("First name is required"),
    body('lastName').not().isEmpty().trim().withMessage("Last name is required"),
    body('phoneNumber').notEmpty().withMessage('Phone number is required'),
    body('phoneNumber').isNumeric().withMessage('Phone number must be numeric'),
    body('phoneNumber').isLength({ min: 5, max: 15 }).withMessage('Phone number must be between 5 and 15 digits'),
    body('address').not().isEmpty().trim().withMessage("Address is required"),
    body('email').not().isEmpty().trim().withMessage("Email is required"),
    body('email').normalizeEmail().isEmail().withMessage("Email needs to be in format user@domain.com"),
    body('employmentDate').not().isEmpty().trim().withMessage("Employment date is required"),
    body('username').not().isEmpty().trim().withMessage("Username is required"),
    body('password').not().isEmpty().trim().withMessage("Password is required"),
    addEmployee)

module.exports = router
