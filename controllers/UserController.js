const { Router } = require('express');
const UserService = require('../services/UserService');
const {
  validateDisplayName,
  emailValidation,
  validateUniqueEmail,
  passwordValidation,
} = require('../middlewares');
const statusCode = require('../dicts/statusCodesHTTP');

const router = Router();

router.post('/',
  validateDisplayName,
  emailValidation,
  validateUniqueEmail,
  passwordValidation,
  async (request, response) => {
    const { displayName, email, password, image } = request.body;
    const newUser = { displayName, email, password, image };

    const token = await UserService.create(newUser);
    return response.status(statusCode.CREATED).json({ token });
  });

module.exports = router;
