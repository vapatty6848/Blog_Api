const { Router } = require('express');
const { createPosts, findAllPosts, findById, deletePost, editPost, search } = require('../controllers/postsController');
const authentication = require('../middlewares/authentication');

const posts = Router();

posts.get('/post/:id', authentication, findById);
posts.delete('/post/:id', authentication, deletePost);
posts.put('/post/:id', authentication, editPost);
posts.get('/search', authentication, search);
posts.get('/post', authentication, findAllPosts);
posts.post('/post', authentication, createPosts);

module.exports = posts;
