const express = require('express');

const router = express.Router();

const { Users } = require('../models');

const { createToken } = require('../auth/token');

const authToken = require('../middlewares/authToken');

const { isTheDisplayNameValid, isTheEmailValid, isThePasswordValid } = require('../services/userValidation');

router.post('/', async (request, response) => {
  const nameCheck = await isTheDisplayNameValid(request.body.displayName);
  if (nameCheck.err) return response.status(nameCheck.err.status).json(nameCheck.err);

  const emailCheck = await isTheEmailValid(request.body.email);
  if (emailCheck.err) return response.status(emailCheck.err.status).json(emailCheck.err);

  const passwordCheck = await isThePasswordValid(request.body.password);
  if (passwordCheck.err) return response.status(passwordCheck.err.status).json(passwordCheck.err);

  try {
    const { displayName, email, password, image } = request.body;
    const newUser = await Users.create({ displayName, email, password, image });
    const token = createToken({ newUser });
    return response.status(201).json({ token });
  } catch {
    return { err: { status: 500, message: 'Internal Error' } };
  }
});

router.get('/', authToken, async (_request, response) => {
  try {
    const allUsers = await Users.findAll();
    response.status(200).json(allUsers);
  } catch {
    response.status(500).send({ message: 'Internal Error' });
  }
});

module.exports = router;