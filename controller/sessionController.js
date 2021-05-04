const { StatusCodes } = require('http-status-codes');
const { session } = require('../service');

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await session.authLogin(email, password);
    return res.status(StatusCodes.OK).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  login,
};
