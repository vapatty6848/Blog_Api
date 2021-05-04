const { Router } = require('express');

const { Posts } = require('../controller');
const { authorization } = require('../middlewares');

const posts = Router();

posts.delete('/:id', authorization, Posts.destroyPost);
posts.get('/search', authorization, Posts.search);
posts.get('/:id', authorization, Posts.getById);
posts.get('/', authorization, Posts.getAll);
posts.post('/', authorization, Posts.create);
posts.put('/:id', authorization, Posts.edit);

module.exports = posts;
