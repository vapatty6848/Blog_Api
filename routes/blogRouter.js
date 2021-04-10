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
blogRouter.get('/post');
blogRouter.put('/post/:id');
blogRouter.get('/post/:id');
blogRouter.delete('post/:id');
blogRouter.post('/post');

module.exports = blogRouter;
