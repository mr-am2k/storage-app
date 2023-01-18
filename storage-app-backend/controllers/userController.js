const { StatusCodes } = require('http-status-codes');
const client = require('../db/database');
const bcrypt = require('bcrypt');

const changePassword = async (req, res) => {
  const userId = req.params.userId;

  try {
    const fetchUser = await client.query(
      'SELECT * FROM users WHERE employee_id = $1',
      [userId]
    );

    const fetchedUser = fetchUser.rows[0];

    if (!fetchedUser) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: 'There is no user with id: ' + userId });
    }

    const newPassword = req.body.password;

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(newPassword, salt);

    const updatedPassword = await client.query(
      'UPDATE users SET password = $1 WHERE employee_id = $2',
      [hashedPassword, userId]
    );

    const result = updatedPassword.rowCount;

    if (!result) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: 'Updated failed' });
    }

    res.status(StatusCodes.OK).json({ message: 'Updated succeeded' });
  } catch (error) {
    res.status(StatusCodes.BAD_REQUEST).json({ message: error });
  }
};

module.exports = { changePassword };
