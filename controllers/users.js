const { users } = require('../services');

const create = async (req, res, next) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await users.create(displayName, email, password, image);
    res.status(201).json({ token });
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allUsers = await users.getAll();
    res.status(200).json(allUsers);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await users.getById(id);
    if (!user) return res.status(404).json({ message: 'Usuário não existe' });
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    await users.remove(token);
    res.status(204).end();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
