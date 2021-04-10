const jwt = require('jsonwebtoken');
const UserServices = require('../../services/UserServices');

const secret = 'segredo';
const INTERNAL_SERVER_ERROR = 500;

const createToken = async (req, res) => {
  const { email } = req.body;

  const jwtConfig = { expiresIn: '7d', algorithm: 'HS256' };

  try {
    const user = await UserServices.getUserByEmail(email);
    const data = user.dataValues;
    const token = jwt.sign({ data }, secret, jwtConfig);

    res.status(req.status).json({ token });
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

module.exports = createToken;
