const express = require('express');
const { body } = require('express-validator');
const verifyJWT = require('../middleware/authMiddleware.js');
const ROLES_LIST = require('../config/roles_list.js');
const verifyRole = require('../middleware/roleMiddleware.js');
const {
  addMaterial,
  getMaterials,
  getMaterial,
  updateMaterial,
} = require('../controllers/materialController.js');

const router = express.Router();

router
  .route('/')
  .post(
    verifyJWT,
    verifyRole(ROLES_LIST.User, ROLES_LIST.Admin),
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('amount')
      .not()
      .isEmpty()
      .withMessage('Amount is required')
      .isInt({ gt: 0 })
      .withMessage('Amount must be greater than 0'),
    body('minAmount')
      .not()
      .isEmpty()
      .withMessage('Min amount is required')
      .isInt({ gt: 0 })
      .withMessage('Min amount must be greater than 0'),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price is required')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('unitOfMeasure')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Unit of measure is required'),
    body('used')
      .isBoolean()
      .withMessage('Field must be a boolean')
      .isLength({ min: 1 })
      .withMessage('Used is required'),
    body('supplierId').not().isEmpty().withMessage('SupplierId is required'),
    addMaterial
  );

router
  .route('/')
  .get(verifyJWT, verifyRole(ROLES_LIST.User, ROLES_LIST.Admin), getMaterials);

router
  .route('/:materialId')
  .get(verifyJWT, verifyRole(ROLES_LIST.User, ROLES_LIST.Admin), getMaterial);

router
  .route('/:materialId')
  .put(
    verifyJWT,
    verifyRole(ROLES_LIST.User, ROLES_LIST.Admin),
    body('name').not().isEmpty().trim().withMessage('Name is required'),
    body('amount')
      .not()
      .isEmpty()
      .withMessage('Amount is required')
      .isInt({ gt: 0 })
      .withMessage('Amount must be greater than 0'),
    body('minAmount')
      .not()
      .isEmpty()
      .withMessage('Min amount is required')
      .isInt({ gt: 0 })
      .withMessage('Min amount must be greater than 0'),
    body('price')
      .not()
      .isEmpty()
      .withMessage('Price is required')
      .isFloat({ gt: 0 })
      .withMessage('Price must be greater than 0'),
    body('unitOfMeasure')
      .not()
      .isEmpty()
      .trim()
      .withMessage('Unit of measure is required'),
    body('used')
      .isBoolean()
      .withMessage('Field must be a boolean')
      .isLength({ min: 1 })
      .withMessage('Used is required'),
    body('supplierId').not().isEmpty().withMessage('SupplierId is required'),
    updateMaterial
  );

module.exports = router;
