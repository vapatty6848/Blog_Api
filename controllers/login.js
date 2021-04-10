const { Router } = require('express');
const service = require('../services/login');
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
    const userRegistered = await service.findByEmail(req.body.email);

    if (!userRegistered) return res.status(BAD_REQUEST).json(INVALID_FIELDS);

    const token = createToken({
      id: userRegistered.id,
      email: userRegistered.email,
      name: userRegistered.displayName,
    });

    return res.status(OK).json({ token });
  },
);

module.exports = loginRouter;
