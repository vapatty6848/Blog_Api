const { Router } = require('express');

const { user } = require('./router/index');

const router = Router();

router.use('/user', user);

module.exports = router;
