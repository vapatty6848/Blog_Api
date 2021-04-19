const { Router } = require('express');
const {
  CreatePostController,
  getPostById,
  getPosts,
  editPostController,
  deletePostController,
} = require('../controller/post');
const getPostByIdValidation = require('../middlewares/GetPostByIdValidate');
const verifyToken = require('../middlewares/VerifyToken');
const validatePostFields = require('../middlewares/CreatePostValidate');

const PostRouter = Router();

PostRouter.post('/', verifyToken, validatePostFields, CreatePostController);
// PostRouter.get('/', verifyToken, getPosts);
// PostRouter.get('/:id', verifyToken, getPostByIdValidation, getPostById);
// PostRouter.put('/:id', verifyToken, validatePostFields, editPostController);
// PostRouter.delete('/:id', verifyToken, getPostByIdValidation, deletePostController);

module.exports = PostRouter;

// const { id: userId } = res.locals.user;
