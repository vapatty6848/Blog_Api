const express = require('express');

const controllers = require('../controllers');
const middlewares = require('../middlewares');

const postsRouter = express.Router();

postsRouter.post('/', middlewares.validateToken, controllers.posts);

module.exports = postsRouter;
