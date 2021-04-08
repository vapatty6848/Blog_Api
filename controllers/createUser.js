const { User } = require('../models');
const { generateToken } = require('../helpers/utils');

const createUser = (req, res) => {
  const { displayName, email, password, image } = req.body;

  User.create({ displayName, email, password, image })
    .then((user) => {
      const token = generateToken(user.dataValues.email);
      return res.status(201).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = createUser;
