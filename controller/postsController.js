const rescue = require('express-rescue');
const { Router } = require('express');

const { validateCreatePost } = require('../middlewares/validatePost');
const { verifyToken } = require('../auth/validateJWT');
const { createPost, getAllPosts, getPostById } = require('../service/postService');

const { CREATED, OK, NOT_FOUND } = require('../utils/statusCodeHandler');

const postsController = Router();

postsController.post('/', verifyToken, validateCreatePost, rescue(async (request, response) => {
  const { id } = request.user.dataValues;
  const { title, content } = request.body;

  const createdPost = await createPost(title, content, id);

  response.status(CREATED.code).json(createdPost);
}));

postsController.get('/', verifyToken, rescue(async (request, response) => {
  const getPosts = await getAllPosts();
  response.status(OK.code).json(getPosts);
}));

postsController.get('/:id', verifyToken, rescue(async (request, response) => {
  const { id } = request.params;
  const getPost = await getPostById(id);

  if (!getPost) {
    return response.status(NOT_FOUND.code).json({ message: NOT_FOUND.message.postNotFound });
  }

  response.status(OK.code).json(getPost[0]);
}));

module.exports = postsController;
