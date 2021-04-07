const { Router } = require('express');
const LoginService = require('../services/LoginService');

const router = Router();

router.post(
  '/',
  async (request, response) => {
    response.status(200).send('Login Route');
  },
);

module.exports = router;
