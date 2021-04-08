const { createToken } = require('../utils/createToken');
const { CREATED, CONFLICT, OK, NOT_FOUND, NO_CONTENT } = require('../utils/allStatusCode');
const { Users } = require('../models');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const emailExists = await Users.findOne({ where: { email } });
  if (emailExists) {
    return res.status(CONFLICT).json({ message: 'Usuário já existe' });
  }

  await Users.create({ displayName, email, password, image });
  const token = createToken({ email });
  res.status(CREATED).json(token);
};

const getUsers = async (req, res) => {
  const users = await Users.findAll();
  res.status(OK).json(users);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const thisUser = await Users.findByPk(id);
  if (!thisUser) {
    return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });
  }
  res.status(OK).json(thisUser);
};

const removeUser = async (req, res) => {
  const email = req.user.data;
  await Users.destroy(
    {
      where: { email },
    },
  );
  return res.status(NO_CONTENT).send();
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  removeUser,
};
