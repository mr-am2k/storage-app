const express = require('express');
const { addEmployee } = require('../controllers/employeeController.js');
const { body } = require('express-validator');
const verifyJWT = require('../middleware/authMiddleware.js');

const router = express.Router();

router.route('/add').post(
  verifyJWT,
  body('firstName')
    .not()
    .isEmpty()
    .trim()
    .withMessage('First name is required'),
  body('lastName').not().isEmpty().trim().withMessage('Last name is required'),
  body('phoneNumber')
    .notEmpty()
    .withMessage('Phone number is required')
    .isNumeric()
    .withMessage('Phone number must be numeric')
    .isLength({ min: 5, max: 15 })
    .withMessage('Phone number must be between 5 and 15 digits'),
  body('address').not().isEmpty().trim().withMessage('Address is required'),
  body('email')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Email is required')
    .normalizeEmail()
    .isEmail()
    .withMessage('Email needs to be in format user@domain.com'),
  body('employmentDate')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Employment date is required'),
  body('username')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Username is required')
    .isLength({ min: 4, max: 15 })
    .withMessage('Username must be between 4 and 15 characters'),
  body('password')
    .not()
    .isEmpty()
    .trim()
    .withMessage('Password is required')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 8 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/, 'i')
    .withMessage(
      'Password must contain at least one lowercase letter, one uppercase letter and one number.'
    ),
  addEmployee
);

module.exports = router;
