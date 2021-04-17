const { Router } = require('express');

const { Posts } = require('../controllers');
const { auth } = require('../middlewares');

const posts = Router();

posts.post('/', auth, Posts.create);

module.exports = posts;
