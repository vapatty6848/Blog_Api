const { Router } = require('express');

const { LoginController } = require('../controllers');
const { validateFieldsLogin } = require('../middlewares/LoginMiddleware');

const router = new Router();

router.post('/', validateFieldsLogin, LoginController.login);

module.exports = router;
