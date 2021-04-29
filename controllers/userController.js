const userRouter = require('express').Router();
const userMiddleware = require('../middlewares/userMiddleware');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/requisito1Validations');

const validateToken = require('../auth/validateToken');

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userMiddleware.createUser);

userRouter.get('/', validateToken, userMiddleware.getAll);

module.exports = userRouter;
