const userRouter = require('express').Router();
const userMiddleware = require('../middlewares/userMiddleware');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/requisito1Validations');
const validateToken = require('../auth/validateToken');

userRouter.get('/', validateToken, userMiddleware.getAll);
userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userMiddleware.createUser);
userRouter.get('/:id', validateToken, userMiddleware.findByID);

module.exports = userRouter;
