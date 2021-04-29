const loginRouter = require('express').Router();
const loginMiddleware = require('../middlewares/loginMiddleware');

const { validateEmail, validatePassword } = require('../middlewares/requisito2Validations');

loginRouter.post('/', validateEmail, validatePassword, loginMiddleware.login);

module.exports = loginRouter;
