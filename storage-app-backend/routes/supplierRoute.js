const express = require('express');
const { body } = require('express-validator');
const verifyJWT = require('../middleware/authMiddleware.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRole = require('../middleware/roleMiddleware.js');
const {
  addSupplier,
  getSuppliers,
  getSupplier,
  updateSupplier,
} = require('../controllers/supplierController.js');

const router = express.Router();

router
  .route('/')
  .post(
    verifyJWT,
    verifyRole(ROLES_LIST.User, ROLES_LIST.Admin),
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('uid')
      .not()
      .isEmpty()
      .trim()
      .withMessage('UID is required')
      .isNumeric()
      .withMessage('UID needs to be numeric')
      .isLength({ min: 13, max: 13 })
      .withMessage('UID needs to have 13 numbers'),
    body('pdv')
      .not()
      .isEmpty()
      .trim()
      .withMessage('PDV is required')
      .isNumeric()
      .withMessage('PDV needs to be numeric')
      .isLength({ min: 0, max: 100 })
      .withMessage('PDV needs to be between 0 i 100'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .isNumeric()
      .withMessage('Phone number must be numeric')
      .isLength({ min: 5, max: 15 })
      .withMessage('Phone number must be between 5 and 15 digits'),
    body('contactPerson')
      .not()
      .isEmpty()
      .trim()
      .withMessage('First name is required'),
    body('email')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Email is required')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email needs to be in format user@domain.com'),
    body('startDate')
      .not()
      .isEmpty()
      .withMessage('Start date is required')
      .isBefore(new Date().toISOString())
      .withMessage('Start date can not be in the future!'),
    addSupplier
  );
router
  .route('/')
  .get(verifyJWT, verifyRole(ROLES_LIST.User, ROLES_LIST.Admin), getSuppliers);
router
  .route('/:supplierId')
  .get(verifyJWT, verifyRole(ROLES_LIST.User, ROLES_LIST.Admin), getSupplier);
router
  .route('/:supplierId')
  .put(
    verifyJWT,
    verifyRole(ROLES_LIST.User, ROLES_LIST.Admin),
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('uid')
      .not()
      .isEmpty()
      .trim()
      .withMessage('UID is required')
      .isNumeric()
      .withMessage('UID needs to be numeric')
      .isLength({ min: 13, max: 13 })
      .withMessage('UID needs to have 13 numbers'),
    body('pdv')
      .not()
      .isEmpty()
      .trim()
      .withMessage('PDV is required')
      .isNumeric()
      .withMessage('PDV needs to be numeric')
      .isLength({ min: 0, max: 100 })
      .withMessage('PDV needs to be between 0 i 100'),
    body('phoneNumber')
      .notEmpty()
      .withMessage('Phone number is required')
      .isNumeric()
      .withMessage('Phone number must be numeric')
      .isLength({ min: 5, max: 15 })
      .withMessage('Phone number must be between 5 and 15 digits'),
    body('contactPerson')
      .not()
      .isEmpty()
      .trim()
      .withMessage('First name is required'),
    body('email')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Email is required')
      .normalizeEmail()
      .isEmail()
      .withMessage('Email needs to be in format user@domain.com'),
    body('startDate')
      .not()
      .isEmpty()
      .withMessage('Start date is required')
      .isBefore(new Date().toISOString())
      .withMessage('Start date can not be in the future!'),
    updateSupplier
  );

module.exports = router;
