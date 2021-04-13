const { Router } = require('express');
const { createPosts, findAllPosts, findById, deletePost } = require('../controllers/postsController');
const authentication = require('../middlewares/authentication');

const posts = Router();

posts.post('/post', authentication, createPosts);
posts.get('/post', findAllPosts);
posts.get('/post/:id', authentication, findById);
posts.delete('/post/:id', authentication, deletePost);

module.exports = posts;
