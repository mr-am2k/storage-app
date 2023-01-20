const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateRefreshToken = async (req, res) => {
  if (!req.headers.authorizationrefresh) {
    return res.status(StatusCodes.BAD_REQUEST);
  }

  const refreshToken = req.headers.authorizationrefresh.split(' ')[1];

  const username = jwt.decode(refreshToken).username;

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
    if (err || foundUser.rows[0].username !== decoded.username) {
      return res
        .status(StatusCodes.FORBIDDEN)
        .json({ message: 'Forbidden access!' });
    }
    const accessToken = jwt.sign(
      { user: { username: decoded.username, role: foundUser.rows[0].role } },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );
    res.json({ accessToken });
  });
};

module.exports = { generateRefreshToken };
