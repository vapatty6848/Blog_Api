const { Router } = require('express');

const { user } = require('./routes/index');

const router = Router();

router.use('/user', user);

module.exports = router;
