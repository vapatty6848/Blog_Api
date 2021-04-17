const { Router } = require('express');

const { user, session } = require('./routes/index');

const router = Router();

router.use('/', session);
router.use('/user', user);

module.exports = router;
