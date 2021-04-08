const { Router } = require('express');
const { PostsServices } = require('../services');
const { ValidatePosts } = require('../middlewares');
const validateToken = require('../auth/validateToken');

const Route = new Router();

Route.post('/', validateToken, ValidatePosts.InputsExists, PostsServices.createNewPost);
Route.get('/', validateToken, PostsServices.getAllPosts);
Route.get('/:id', validateToken, ValidatePosts.IfPostExist, PostsServices.getPostById);

module.exports = Route;
