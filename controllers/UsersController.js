const { Router } = require('express');
const { User } = require('../models');
const userValidation = require('../schemas/userValidation');

const router = new Router();

const SUCCESS = 201
const BAD_REQUEST = 400;
const AUTH_ERROR = 401;
const INTERNAL_SERVER_ERROR = 500;

router.post('/', userValidation, async(req, res) => {
  try {
    const {
      displayName, email, password, image,
    } = req.body;

    const user = await User.findOne({ where: { email } });

    if(user) return res.status(AUTH_ERROR).json({ message: 'Usuário já existe'});

    const newUser = await User.create({ displayName, email, password, image });

    return res.status(SUCCESS).json(newUser);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
