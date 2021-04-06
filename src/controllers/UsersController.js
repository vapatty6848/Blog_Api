const { Users } = require('../../models');
const { status } = require('../libs/dicts');
const { secret, jwtConfig, createJWTPayload, jwtSign } = require('../authentication/jwtConfig');

const createUser = async (req, res) => {
  const { displayName, email, password, image } = req.body;

  const insertedUser = await Users.create({ displayName, email, password, image });

  const payload = createJWTPayload(insertedUser);

  const token = jwtSign(payload, secret, jwtConfig);

  res.status(status.created).json({ token });
};

const getUserById = async (req, res) => {
  res.status(200).json({ message: 'getUserById' });
};

const getAllUsers = async (req, res) => {
  const users = await Users.findAll({});
  console.log(users);
  res.status(status.ok).json(users);
};

const deleteUser = async (req, res) => {
  res.status(200).json({ message: 'deleteUser' });
};

const login = async (req, res) => {
  const { email, password } = req.body;

  const payload = createJWTPayload({ email, password });

  const token = jwtSign(payload, secret, jwtConfig);

  res.status(status.ok).json({ token });
};

module.exports = {
  createUser,
  getUserById,
  getAllUsers,
  deleteUser,
  login,
};
