const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');

const jwt = require('jsonwebtoken');
require('dotenv').config();

const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  const { username, password } = req.body;

  const foundUser = await client.query(
    'SELECT * FROM users WHERE username = $1',
    [username]
  );

  const foundUserData = foundUser.rows[0];

  if (!foundUserData) {
    return res
      .status(StatusCodes.NOT_FOUND)
      .json({ message: 'There is no user with this username: ' + username});
  }

  const foundEmployee = await client.query(
    'SELECT * FROM employees WHERE id = $1',
    [foundUserData.employee_id]
  );

  if (foundEmployee.rows[0].dismissal_date !== null) {
    return res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: 'You are fired' });
  }

  const match = await bcrypt.compare(password, foundUser.rows[0].password);

  if (match) {
    const accessToken = jwt.sign(
      {
        user: {
          username: foundUser.rows[0].username,
          role: foundUser.rows[0].role,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '1h',
      }
    );

    const refreshToken = jwt.sign(
      {
        username: foundUser.rows[0].username,
      },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: '1d',
      }
    );

    const user = {
      username: foundUser.rows[0].username,
      role: foundUser.rows[0].role,
    };

    res.status(StatusCodes.OK).json({ accessToken, refreshToken, user });
  } else {
    res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Wrong password' });
  }
};

module.exports = { login };
