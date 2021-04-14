const { Router } = require('express');
const {
  createPosts, findAllPosts, findById, deletePost, editPost,
} = require('../controllers/postsController');
const authentication = require('../middlewares/authentication');

const posts = Router();

posts.post('/post', authentication, createPosts);
posts.get('/post', authentication, findAllPosts);
posts.get('/post/:id', authentication, findById);
posts.delete('/post/:id', authentication, deletePost);
posts.put('/post/:id', authentication, editPost);

module.exports = posts;
