const express = require('express');
const postsController = require('./postsController');
const { validateTitle, validateContent } = require('../validations/postValidations');
const validateToken = require('../token/validateToken');

const postsRouter = express.Router();

postsRouter.post('/', validateToken, validateTitle, validateContent, postsController.createPost);

postsRouter.get('/search?:q', validateToken, postsController.searchPosts);

postsRouter.get('/', validateToken, postsController.getAllPosts);

postsRouter.get('/:id', validateToken, postsController.getById);

postsRouter.put('/:id', validateToken, validateTitle, validateContent, postsController.updatePost);

module.exports = postsRouter;
