const services = require('../services/usersServices');

const createUser = async (req, res, next) => {
  try {
    const newUser = req.body;
    const token = await services.createUser(newUser);

    return res.status(201).json({ token });
  } catch (err) {
    return next(err);
  }
};

const findAllUsers = async (req, res, next) => {
  try {
    const allUser = await services.findAllUsers();

    return res.status(200).json(allUser);
  } catch (err) {
    return next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const allUser = await services.findById(id);

    return res.status(200).json(allUser);
  } catch (err) {
    return next(err);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const { email } = req;
    await services.deleteUser(email);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createUser,
  findAllUsers,
  findById,
  deleteUser,
};
