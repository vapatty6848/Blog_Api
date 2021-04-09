const { User } = require('../models');

const getAllUsers = (_req, res) => {
  User.findAll()
    .then((users) => res.status(200).json(users))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = getAllUsers;
