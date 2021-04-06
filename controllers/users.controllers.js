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

module.exports = {
  create,
  getAll,
};
