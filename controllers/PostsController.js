const { Router } = require('express');
const { PostsServices } = require('../services');
const { ValidatePosts } = require('../middlewares');
const validateToken = require('../auth/validateToken');

const Route = new Router();

Route.post('/', validateToken, ValidatePosts.IfInputsExists, PostsServices.createNewPost);
Route.get('/', validateToken, PostsServices.getAllPosts);
Route.get('/search', validateToken, PostsServices.getPostByQuery);
Route.get('/:id', validateToken, ValidatePosts.IfPostExist, PostsServices.getPostById);

Route.put('/:id', validateToken, ValidatePosts.IfPostExist,
  ValidatePosts.IfUserHasAuthorization, ValidatePosts.IfInputsExists, PostsServices.editPostById);

Route.delete('/:id', validateToken, ValidatePosts.IfPostExist,
  ValidatePosts.IfUserHasAuthorization, PostsServices.destroyPost);

module.exports = Route;
