const { Router } = require('express');
const { User } = require('../models');
const { loginValidate } = require('../schemas/loginValidation');
const createToken = require('../auth/createToken');
const { OK, INTERNAL_SERVER_ERROR, BAD_REQUEST } = require('../document/HTTPStatus');

const router = new Router();

router.post('/', loginValidate, async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(BAD_REQUEST).json({ message: 'Campos inválidos' });
    }

    const token = createToken(user);

    return res.status(OK).json({ token });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

module.exports = router;
