const { Router } = require('express');

const BlogPostsController = require('../controllers/BlogPostsController');

const validateBlogPostObj = require('../middlewares/validateBlogPostObj');
const ensureAuth = require('../middlewares/ensureAuth');

const blogPostsRouter = Router();

const blogPostsController = new BlogPostsController();

blogPostsRouter.get('/', ensureAuth, blogPostsController.show);
blogPostsRouter.get('/:id', ensureAuth, blogPostsController.find);
blogPostsRouter.post('/', validateBlogPostObj, ensureAuth, blogPostsController.create);
blogPostsRouter.put('/:id', validateBlogPostObj, ensureAuth, blogPostsController.update);
blogPostsRouter.delete('/:id', ensureAuth, blogPostsController.delete);

module.exports = blogPostsRouter;
