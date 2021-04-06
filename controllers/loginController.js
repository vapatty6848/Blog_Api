const express = require('express');

const { createToken } = require('../auth/token');

const { loginValidation } = require('../services/loginValidation');

const router = express.Router();

router.post('/', async (request, response) => {
  const user = await loginValidation(request.body);

  if (user.err) return response.status(user.err.status).json(user.err);

  const token = createToken({ user });

  response.status(200).json({ token });
});

module.exports = router;
