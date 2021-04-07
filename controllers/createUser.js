const jwt = require('jsonwebtoken');
const { Users } = require('../models');

const segredo = 'token';

const createUser = (req, res) => {
  const { displayName, email, password, image } = req.body;
  
  Users.create({ displayName, email, password, image })
  .then((user) => {
    console.log(user.dataValues);
    const token = jwt.sign({email: user.dataValues.email}, segredo);
    return res.status(201).json(token);
  })
  // .catch((e) => {
  //   console.log(e.message);
  //   res.status(500).send({ message: 'Algo deu errado' });
  // });
};

module.exports = createUser;
