const express = require('express');
const { login } = require('../controllers/authController.js');
const { body } = require('express-validator');

const router = express.Router();

router
  .route('/login')
  .post(
    body('username').not().isEmpty().trim().withMessage('Username is required'),
    body('password')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Password is required'),
    login
  );

module.exports = router;
