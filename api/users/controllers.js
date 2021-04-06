const { Users } = require('../../models');
const generateToken = require('../utils/generateToken');

const create = async ({ body }, res, _next) => {
  const { displayName, email, password, image } = body;
  const users = await Users.findAll({ where: { email: body.email } });

  if (users.length > 0) {
    const message = 'Usuário já existe';
    return res.status(409).json({ message });
  }

  const user = await Users.create({ email, displayName, image, password });
  const { id } = user;
  if (id) {
    const token = generateToken({ id: user.id });
    return res.status(201).json({ token });
  }

  return res.status(400).json({ message: 'Error' });
};

const getAll = async (req, res, _next) => {
  const users = await Users.findAll();
  res.status(200).json(users);
};

module.exports = { create, getAll };
