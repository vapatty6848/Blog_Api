const { StatusCodes } = require('http-status-codes');
const { user } = require('../services');

const createUser = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await user.createUser(displayName, email, password, image);

    return res.status(StatusCodes.CREATED).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
};
