const userRouter = require('express').Router();
const userMiddleware = require('../middlewares/userMiddleware');
const {
  validateDisplayName,
  validateEmail,
  validatePassword,
} = require('../middlewares/validations');

userRouter.get('/', (req, res) => {
  res.send('Teste testado...');
});

userRouter.post('/', validateDisplayName, validateEmail, validatePassword, userMiddleware.createUser);

module.exports = userRouter;
