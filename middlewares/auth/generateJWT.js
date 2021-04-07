const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = 'segredo';

const createToken = (req, res) => {
  const { email } = req.body;

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  User.findAll({ where: { email } })
    .then((user) => {
      const userData = user[0].dataValues;
      const token = jwt.sign({ data: { userData } }, secret, jwtConfig);

      res.status(req.status).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = createToken;
