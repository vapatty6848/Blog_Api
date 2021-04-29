const userRouter = require('express').Router();
const userMiddleware = require('../middlewares/userMiddleware');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/requisito1Validations');

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userMiddleware.createUser);

module.exports = userRouter;
