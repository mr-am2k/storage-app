const express = require('express');
const { changePassword } = require('../controllers/userController.js');
const { body } = require('express-validator');
const verifyJWT = require('../middleware/authMiddleware.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRole = require('../middleware/roleMiddleware.js');

const router = express.Router();

router.route('/change-password/:userId').put(
  verifyJWT,
  verifyRole(ROLES_LIST.User, ROLES_LIST.Admin),
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
  changePassword
);

module.exports = router;
