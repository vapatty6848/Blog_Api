const { Router } = require('express');

const blogPostsController = require('../controllers/BlogPostsController');
const { validateFieldsPost, validateDeletePost } = require('../middlewares/BlogPostsMiddleware');

const router = new Router();

router.get('/:id', blogPostsController.getById);
router.get('/', blogPostsController.getAll);
router.post('/', validateFieldsPost, blogPostsController.create);
router.delete('/:id', validateDeletePost, blogPostsController.remove);

module.exports = router;
