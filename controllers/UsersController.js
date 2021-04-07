const { Router } = require('express');
const { User } = require('../models');
const { validateUser } = require('../schemas/userValidation');
const verifyAuth = require('../schemas/verifyAuth');
const createToken = require('../auth/createToken');
const {
  OK, CONFLICT, SUCCESS, INTERNAL_SERVER_ERROR
} = require('../document/HTTPStatus');

const router = new Router();

router.post('/', validateUser, async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;

    const user = await User.findOne({ where: { email } });
    if (user) return res.status(CONFLICT).json({ message: 'Usuário já existe' });

    const newUser = await User.create({ displayName, email, password, image });
    const token = createToken(newUser);

    return res.status(SUCCESS).json({ token });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

router.get('/', verifyAuth, async (_req, res) => {
  try {
    const users = await User.findAll();

    return res.status(OK).json(users);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
