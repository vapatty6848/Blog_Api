const { userService } = require('../services');
const { createToken } = require('../middlewares/CheckToken');

const { OK, CREATED, NOT_FOUND, NO_CONTENT } = require('../schema/statusSchema');

// *** CREATE NEW USER ***
const create = async (req, res) => {
  const { body } = req;

  const userCreated = await userService.create(body);
  const token = await createToken(userCreated);

  res.status(CREATED).json({ token });
};

// *** GET ALL USERS ***
const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.status(OK).json(users);
};

// *** GET USER BY ID ***
const getById = async (req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);
  if (!user) return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });

  res.status(OK).json(user);
};

// *** DELETE USER ***
const remove = async (req, res) => {
  const { id } = req.user;

  const result = await userService.remove(id);
  if (result.message) return res.status(NOT_FOUND).json({ message: result.message });

  res.status(NO_CONTENT).json();
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
