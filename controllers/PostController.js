const { Router } = require('express');
const { status, error } = require('../middlewares/errorMessage');
const userVerification = require('../middlewares/userVerification');
const BlogService = require('../services/BlogService');
const validateToken = require('../auth/validateToken');

const PostController = Router();

PostController.post('/',
  userVerification.verifyPostFields,
  userVerification.verifyToken, async (req, res) => {
    const { title, content } = req.body;
    const { authorization } = req.headers;
    const { id } = validateToken(authorization);
    const blogData = await BlogService.addPost({
      userTitle: title, userContent: content, userId: id,
    });
    return res.status(status.Created).json(blogData);
  });

PostController.get('/search',
  userVerification.verifyToken, async (req, res) => {
    const { q } = req.query;
    const result = await BlogService.getQuery(q);
    return res.status(status.Ok).json(result);
  });

PostController.get('/',
  userVerification.verifyToken, async (req, res) => {
    const allPosts = await BlogService.getPosts();
    return res.status(status.Ok).json(allPosts);
  });

PostController.get('/:id', userVerification.verifyToken, async (req, res) => {
  const { id } = req.params;
  const posts = await BlogService.getPostsById(id);
  if (!posts) return res.status(status.Not_Found).json(error.noPosts);
  return res.status(status.Ok).json(posts);
});

PostController.put('/:id',
  userVerification.verifyToken,
  userVerification.verifyPostFields,
  userVerification.editorAllowed,
  async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    await BlogService.updatePost(id, title, content);
    const { userId } = await BlogService.getPostsById(id);
    return res.status(status.Ok).json({ title, content, userId });
  });

PostController.delete('/:id',
  userVerification.verifyToken,
  userVerification.editorAllowed,
  async (req, res) => {
    const { id } = req.params;
    const posts = await BlogService.getPostsById(id);
    if (!posts) return res.status(status.Not_Found).json(error.noPosts);
    await BlogService.deletePost(id);
    return res.status(status.No_Content).json();
  });

module.exports = PostController;
