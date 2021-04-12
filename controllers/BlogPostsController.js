const { Router } = require('express');
const AuthorizationUsers = require('../middlewares/authenticates');
const validatedBlogPosts = require('../middlewares/validatedPosts');
const { createNewPost, listPosts } = require('../services/PostsServices');

const BlogPostsController = new Router();

BlogPostsController.post('/', validatedBlogPosts, AuthorizationUsers, async (req, res) => {
  const { title, content } = req.body;
  const { userId } = req.user;
  // console.log('user', req.body, 'user', userId, req.user);
  await createNewPost(title, content, userId);
  return res.status(201).json({
    title,
    content,
    userId,
  });
});
BlogPostsController.get('/', AuthorizationUsers, async (req, res) => {
  const post = await listPosts();
  return res.status(200).json(post);
});

module.exports = BlogPostsController;
