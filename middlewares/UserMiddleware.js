const { User } = require('../models');

const SUCESS = 200;

const getAllUsers = (req, res) => {
  User.findAll()
    .then((users) => res.status(SUCESS).json(users))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

const createUser = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then(() => {
      req.status = 201;

      next();
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
