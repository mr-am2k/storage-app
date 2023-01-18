const express = require('express');
const {
  generateRefreshToken,
} = require('../controllers/refreshTokenController.js');
const { body } = require('express-validator');

const router = express.Router();

router.route('/refresh-token').get(generateRefreshToken);

module.exports = router;
