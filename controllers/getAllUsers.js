const { Users } = require('../models');

const getAllUsers = (_req, res) => {
  Users.findAll()
    .then((users) => res.status(200).json(users))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = getAllUsers;
