const { userService } = require('../services');
const { createToken, verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, NO_CONTENT } = require('../schema/statusSchema');

// *** CREATE NEW USER ***
const create = async (req, res) => {
  const { body } = req;

  const userCreated = await userService.create(body);
  const token = await createToken(userCreated);

  res.status(CREATED).json({ token });
};

// *** GET ALL USERS ***
const getAll = async (req, res) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const users = await userService.getAll();

  res.status(OK).json(users);
};

// *** GET USER BY ID ***
const getById = async (req, res) => {
  const { id } = req.params;
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const user = await userService.getById(id);
  if (!user) return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });

  res.status(OK).json(user);
};

const remove = async (req, res) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const { id } = validation.user;
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
