const { Router } = require('express');
const CreatePostController = require('../models/Posts');
const verifyToken = require('../middlewares/VerifyToken');
const validatePostFields = require('../middlewares/CreatePostValidate');
const getPosts = require('../controller/GetPostsControlelr');
const getPostById = require('../controller/GetPostByIdController');
const editPostController = require('../controller/EditPostController');
const deletePostController = require('../controller/DeletePostController');
const getPostByIdValidation = require('../middlewares/GetPostByIdValidate');

const PostRouter = Router();

PostRouter.post('/', verifyToken, validatePostFields, CreatePostController);
PostRouter.get('/', verifyToken, getPosts);
PostRouter.get('/:id', verifyToken, getPostByIdValidation, getPostById);
PostRouter.put('/:id', verifyToken, validatePostFields, editPostController);
PostRouter.delete('/:id', verifyToken, getPostByIdValidation, deletePostController);

module.exports = PostRouter;
