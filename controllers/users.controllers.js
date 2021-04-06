const { StatusCodes } = require('http-status-codes');
const { users } = require('../services');

const create = async (req, res, next) => {
  try {
    const { body } = req;
    const user = await users.create(body);
    res.status(StatusCodes.CREATED).json(user);
  } catch (err) {
    return next({ err });
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getUsers = await users.getAll();
    res.status(StatusCodes.OK).json(getUsers);
  } catch (err) {
    return next({ err });
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getUser = await users.getOne(id);
    res.status(StatusCodes.OK).json(getUser);
  } catch (err) {
    return next({ err });
  }
};

const removeOne = async (req, res, next) => {
  try {
    const { userId } = req;
    await users.removeOne(userId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    return next({ err });
  }
};

module.exports = {
  create,
  getOne,
  getAll,
  removeOne,
};