const { Router } = require('express');
const { createPosts, findAllPosts, findById } = require('../controllers/postsController');
const authentication = require('../middlewares/authentication');

const posts = Router();

posts.post('/post', authentication, createPosts);
posts.get('/post', findAllPosts);
posts.get('/post/:id', findById);

module.exports = posts;
