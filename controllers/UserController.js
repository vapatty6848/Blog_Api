const { Router } = require('express');
const UserService = require('../services/UserService');
const {
  validateDisplayName,
  validateEmail,
  validateUniqueEmail,
} = require('../middlewares');

const router = Router();

router.post('/',
  validateUniqueEmail,
  validateDisplayName,
  validateEmail,
  async (request, response) => {
    const { displayName, email, password, image } = request.body;
    const newUser = { displayName, email, password, image };

    const token = await UserService.create(newUser);
    return response.json({ token });
  });

module.exports = router;
