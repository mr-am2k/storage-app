const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Bad cookie' });
  }

  const refreshToken = cookies.jwt;

  const username = jwt.decode(refreshToken).username.username;

  const foundUser = await client.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );

  if (!foundUser.rows[0]) {
    res
      .status(StatusCodes.UNAUTHORIZED)
      .json({ message: 'Unauthorized user!' });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.rows[0].username !== decoded.username.username) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Forbidden access!' });
    }
    const accessToken = jwt.sign(
      { username: decoded.username },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '10000s',
      }
    );
    res.json({ accessToken });
  });
};

module.exports = { generateRefreshToken };
