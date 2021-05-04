const { Router } = require('express');

const { user, session, posts } = require('./router/index');

const router = Router();

router.use('/user', user);
router.use('/post', posts);
router.use('/', session);

module.exports = router;
