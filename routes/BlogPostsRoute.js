const { Router } = require('express');

const blogPostsController = require('../controllers/BlogPostsController');
const { validateFieldsPost } = require('../middlewares/BlogPostsMiddleware');

const router = new Router();

// router.get('/:id', blogPostsController.getById);
router.get('/', blogPostsController.getAll);
router.post('/', validateFieldsPost, blogPostsController.create);
// router.delete('/me', blogPostsController.remove);

module.exports = router;
