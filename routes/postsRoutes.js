const { Router } = require('express');
const { createPosts, findAllPosts, findById } = require('../controllers/postsController');
const authentication = require('../middlewares/authentication');

const posts = Router();

posts.get('/post/:id', authentication, findById);
// posts.delete('/post/me', authentication, deletePost);
posts.get('/post', authentication, findAllPosts);
posts.post('/post', createPosts);

module.exports = posts;
