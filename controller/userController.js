const { StatusCode } = require('http-status-codes');
const user = require('../service');

const createUser = async (req, res, next) => {
  try {
    const { body } = req.body;
    const token = await user.createUser(body);
    return res.status(StatusCode.CREATED).json({ token });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
};
