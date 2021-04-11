const { Router } = require('express');
const service = require('../services/users');
const { OK, BAD_REQUEST } = require('../dictionary/statusCode');
const { INVALID_FIELDS } = require('../dictionary/errorMessage');
const Validation = require('../middlewares/userValidation');
const createToken = require('../auth/createToken');

const loginRouter = new Router();

loginRouter.post(
  '/',
  Validation.requiredInfo,
  Validation.emptyRequiredInfo,
  async (req, res) => {
    const { email, password } = req.body;
    const userRegistered = await service.loginUser(email, password);

    if (!userRegistered) return res.status(BAD_REQUEST).json(INVALID_FIELDS);

    const token = createToken({
      id: userRegistered.id,
      email: userRegistered.email,
    });

    return res.status(OK).json({ token });
  },
);

module.exports = loginRouter;
