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

const getAllUsers = async (_req, res, next) => {
  try {
    const users = await user.getAll();

    return res.status(StatusCodes.OK).json(users);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await user.getById(id);
    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    return next(err);
  }
};

const destroyUser = async (req, res, next) => {
  try {
    const { email } = req;
    await user.destroyUser(email);
    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getById,
  destroyUser,
};
