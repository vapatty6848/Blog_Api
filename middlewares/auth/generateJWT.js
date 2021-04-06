const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const secret = 'segredo';

const SUCESS = 200;

const createToken = (req, res) => {
  const { email } = req.body;

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  User.findAll({ where: { email } })
    .then((user) => {
      const token = jwt.sign({ data: { user } }, secret, jwtConfig);

      res.status(SUCESS).json({ token });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = createToken;
