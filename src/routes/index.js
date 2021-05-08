const { Router } = require('express');

const usersRouter = require('./users');
const blogPostsRouter = require('./post');
const sessionRouter = require('./session');

const router = Router();

router.use('/user', usersRouter);
router.use('/login', sessionRouter);
router.use('/post', blogPostsRouter);

module.exports = router;
