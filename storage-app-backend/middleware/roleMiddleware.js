const { StatusCodes } = require('http-status-codes');

const verifyRole = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req?.role) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized user!' });
    }
    const rolesArray = [...allowedRoles];

    const result = rolesArray.includes(req.role);

    if (!result) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: 'Unauthorized user!' });
    }
    next();
  };
};

module.exports = verifyRole;
