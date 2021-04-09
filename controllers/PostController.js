const { Router } = require('express');
const { status, error } = require('../middlewares/errorMessage');
const { verifyToken, verifyPostFields, editorAllowed } = require('../middlewares/userVerification');
const { addPost, getPosts, getPostsById, updatePost, getQuery } = require('../services/BlogService');
const validateToken = require('../auth/validateToken');

const PostController = Router();

PostController.post('/', verifyPostFields, verifyToken, async (req, res) => {
  const { title, content } = req.body;
  const { authorization } = req.headers;
  const { id } = validateToken(authorization);
  const blogData = await addPost({ userTitle: title, userContent: content, userId: id });
  return res.status(status.Created).json(blogData);
});

PostController.get('/search', verifyToken, async (req, res) => {
  const { q } = req.query;
  const result = await getQuery(q);
  return res.status(status.Ok).json(result);
});

PostController.get('/', verifyToken, async (req, res) => {
  const allPosts = await getPosts();
  return res.status(status.Ok).json(allPosts);
});

PostController.get('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const posts = await getPostsById(id);
  if (!posts) return res.status(status.Not_Found).json(error.noPosts);
  return res.status(status.Ok).json(posts);
});

PostController.put('/:id',
  verifyToken,
  verifyPostFields,
  editorAllowed,
  async (req, res) => {
    const { title, content } = req.body;
    const { id } = req.params;
    const updated = await updatePost(id, title, content);
    return res.status(status.Ok).json(updated);
  });

module.exports = PostController;
