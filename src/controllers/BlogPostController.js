const Router = require('express');
const validateAuth = require('../middlewares/validations/validateAuth');
const validateBlogs = require('../middlewares/validations/validateBlogs');
const BlogsService = require('../services/BlogsService');

const BlogPostController = Router();

BlogPostController.get('/search', validateAuth, async (req, res, next) => {
  const { q: searchTerm } = req.query;
  console.log('searchTerm', searchTerm);
  try {
    const blog = await BlogsService.findByText(searchTerm);
    console.log(blog, 'post');
    res.status(200).json(blog);
  } catch (err) {
    console.log('search');
    next(err);
  }
});

BlogPostController.put('/:id', validateAuth, validateBlogs, async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const blog = await BlogsService.editPost(id, { userId, title, content });
    res.status(200).json(blog);
  } catch (err) {
    console.log('edit ');
    next(err);
  }
});

BlogPostController.get('/:id', validateAuth, async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const { id } = req.params;
  try {
    const userPost = await BlogsService.getPostById(id, userId);
    res.status(200).json(userPost);
  } catch (err) {
    console.log('getbyId');
    console.log(err);
    next(err);
  }
});

BlogPostController.delete('/:id', validateAuth, async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = res.locals.user;
  try {
    await BlogsService.deleteById(id, userId);
    res.status(204).json({ message: 'deleted' });
  } catch (err) {
    console.log('delete');
    console.log(err);
    next(err);
  }
});

BlogPostController.get('/', validateAuth, async (_req, res, next) => {
  const { id: userId } = res.locals.user;
  try {
    const userPosts = await BlogsService.getAllPostsByUser(userId);
    res.status(200).json(userPosts);
  } catch (err) {
    console.log('getall');
    console.log(err);
    next(err);
  }
});

BlogPostController.post('/', validateAuth, validateBlogs, async (req, res, next) => {
  const { id: userId } = res.locals.user;
  const { title, content } = req.body;
  try {
    const blog = await BlogsService.createBlog({ title, userId, content });
    res.status(201).json(blog);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = BlogPostController;
