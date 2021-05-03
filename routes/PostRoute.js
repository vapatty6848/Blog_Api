const { Router } = require('express');
const {
  CreatePostController,
  getPosts,
  getPostById,
  editPostController,
  deletePostController,
  getByTextController,
} = require('../controller/post');
const getPostByIdValidation = require('../middlewares/GetPostByIdValidate');
const verifyToken = require('../middlewares/VerifyToken');
const validatePostFields = require('../middlewares/CreatePostValidate');
const checkUserValidation = require('../middlewares/checkUserValidation');

const PostRouter = Router();

PostRouter.get('/search', verifyToken, getByTextController);
PostRouter.post('/', verifyToken, validatePostFields, CreatePostController);
PostRouter.get('/', verifyToken, getPosts);
PostRouter.get('/:id', verifyToken, getPostByIdValidation, getPostById);
PostRouter.put('/:id', verifyToken, checkUserValidation, validatePostFields, editPostController);
PostRouter.delete('/:id', verifyToken, checkUserValidation, getPostByIdValidation, deletePostController);
module.exports = PostRouter;
