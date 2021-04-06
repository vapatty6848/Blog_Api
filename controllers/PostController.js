const { Router } = require('express');

const { BlogPost } = require('../models');

const PostController = new Router();

PostController.get('/', async (request, response) => {
  const posts = await BlogPost.findAll({});
  return response.status(200).json({ posts });
});

PostController.get('/search', async (request, response) => {
  console.log(request.query.q);
  return response.status(200).json({ message: 'PostController' });
});

PostController.get('/:id', async (request, response) => {
  console.log('post');
  return response.status(200).json({ message: 'PostController' });
});

PostController.post('/', async (request, response) => {
  console.log('post');
  return response.status(200).json({ message: 'PostController' });
});

PostController.put('/:id', async (request, response) => {
  console.log('post');
  return response.status(200).json({ message: 'PostController' });
});

PostController.delete('/:id', async (request, response) => {
  console.log('post');
  return response.status(200).json({ message: 'PostController' });
});

module.exports = PostController;
