const { Users } = require('../models');
const TokenCreation = require('../middlewares/TokenCreation');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
const STATUS_NO_CONTENT = 204;
const NOT_FOUND = 404;
const CONFLICT = 409;

const createUser = async (req, res) => {
  const { displayName, email, password } = req.body;

  const emailAlreadyExists = await Users.findOne({ where: { email } });
  if (emailAlreadyExists) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }

  await Users.create({ displayName, email, password });
  const token = TokenCreation(email);
  res.status(STATUS_CREATED).json({ token });
};

const getUsers = async (req, res) => {
  const users = await Users.findAll();
  res.status(STATUS_OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await Users.findByPk(id);
  if (!user) {
    return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });
  }
  res.status(STATUS_OK).json(user);
};

const excludeUser = async (req, res) => {
  const email = req.user.data;
  await Users.destroy(
    {
      where: { email },
    },
  );
  return res.status(STATUS_NO_CONTENT).send();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  excludeUser,
};
