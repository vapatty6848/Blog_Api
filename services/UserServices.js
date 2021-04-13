const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { nameHasValidLength, emailIsValid, passwordHasValidLength } = require('../utils');

const secret = process.env.SECRET || 'secretToken';

const findByEmail = async (email) => {
  const user = await User.findOne({ where: { email } });
  return user;
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  const thisEmailExists = email && await findByEmail(email);

  switch (true) {
    case (!email): return res.status(400).json({ message: '"email" is required' });
    case (!password): return res.status(400).json({ message: '"password" is required' });
    case (!nameHasValidLength(displayName)): return res.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
    case (!emailIsValid(email)): return res.status(400).json({ message: '"email" must be a valid email' });
    case (!!thisEmailExists): return res.status(409).json({ message: 'Usuário já existe' });
    case (!passwordHasValidLength(password)): return res.status(400).json({ message: '"password" length must be 6 characters long' });
    default: break;
  }

  await User.create({ displayName, email, password, image });

  next();
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  switch (true) {
    case (email === ''): return res.status(400).json({ message: '"email" is not allowed to be empty' });
    case (password === ''): return res.status(400).json({ message: '"password" is not allowed to be empty' });
    case (!email): return res.status(400).json({ message: '"email" is required' });
    case (!password): return res.status(400).json({ message: '"password" is required' });
    default: break;
  }

  const user = await User.findOne({ where: { email, password } });
  if (!user) return res.status(400).json({ message: 'Campos inválidos' });

  const token = jwt.sign({ user }, secret);
  return res.status(201).json({ token });
};

module.exports = {
  createUser,
  findByEmail,
  loginUser,
};
