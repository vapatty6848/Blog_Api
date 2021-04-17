const { Router } = require('express');

const { Posts } = require('../controllers');
const { auth } = require('../middlewares');

const posts = Router();

posts.delete('/:id', auth, Posts.destroyPost);
posts.get('/:id', auth, Posts.getById);
posts.get('/', auth, Posts.getAll);
posts.post('/', auth, Posts.create);
posts.put('/:id', auth, Posts.edit);

module.exports = posts;
