const express = require('express');

const controllers = require('../controllers/posts');
// const middlewares = require('../middlewares');

const posts = express.Router();

posts.put('/post', controllers);
// posts.post('/register', controllers.register);

module.exports = posts;
