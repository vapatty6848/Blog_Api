const { Router } = require('express');
const { PostsServices } = require('../services');
const { ValidatePosts } = require('../middlewares');
const validateToken = require('../auth/validateToken');

const Route = new Router();

Route.post('/', validateToken, ValidatePosts.InputsExists, PostsServices.createNewPost);

module.exports = Route;
