const { Router } = require('express');
const UserService = require('../services/UserService');
const { emailValidation, passwordValidation } = require('../middlewares');
const statusCode = require('../dicts/statusCodesHTTP');
const { generateToken } = require('../utils');

const router = Router();

router.post(
  '/',
  emailValidation,
  passwordValidation,
  async (request, response) => {
    const { email, password } = request.body;
    const retrievedUser = await UserService.findByEmail(email);

    if (!retrievedUser || retrievedUser.password !== password) {
      return response
        .status(statusCode.BAD_REQUEST)
        .json({ message: 'Campos inválidos' });
    }

    const token = generateToken({ email });
    response.status(statusCode.OK).json({ token });
  },
);

module.exports = router;
