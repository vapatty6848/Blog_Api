const { Users } = require('../models');
const TokenCreation = require('../middlewares/TokenCreation');

const STATUS_OK = 200;
const STATUS_CREATED = 201;
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

module.exports = {
  createUser,
  getUsers,
};
