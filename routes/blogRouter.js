const express = require('express');

const middlewares = require('../middlewares');
const controllers = require('../controllers');

const blogRouter = express.Router();

blogRouter.get('/', (_req, res) => {
  res.send();
});

blogRouter.post('/user', middlewares.createUserValidation, controllers.createUser);
blogRouter.post('/login', middlewares.loginValidation);
blogRouter.get('/user', middlewares.authorization, controllers.getAllUsers);
blogRouter.get('/user/:id', middlewares.authorization, controllers.getUserById);
blogRouter.delete('/user/me', middlewares.authorization, controllers.deleteLoggedUser);
blogRouter.post('/post', middlewares.authorization, middlewares.createPostValidation, controllers.createPost);
blogRouter.get('/post', middlewares.authorization, controllers.getAllPosts);
blogRouter.get('/post/:id', middlewares.authorization, controllers.getPostById);
blogRouter.delete('/post/:id', middlewares.authorization, middlewares.deletePostByIdValidation, controllers.deletePostById);
blogRouter.put('/post/:id');

module.exports = blogRouter;
