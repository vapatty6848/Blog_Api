const jwt = require('jsonwebtoken');
const { User } = require('../models');

const secret = 'segredo';

const SUCESS = 200;
const CREATED = 201;

const getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(SUCESS).json(users))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

const createUser = (req, res) => {
  const { displayName, email, password, image } = req.body;

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  User.create({ displayName, email, password, image })
    .then((user) => {
      const token = jwt.sign({ data: { user } }, secret, jwtConfig);

      res.status(CREATED).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = {
  getAllUsers,
  createUser,
};
