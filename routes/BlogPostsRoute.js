const { Router } = require('express');

const blogPostsController = require('../controllers/BlogPostsController');
const { validateFieldsPost, validateOwnerPost } = require('../middlewares/BlogPostsMiddleware');
const { validateToken } = require('../middlewares/CheckToken');

const router = new Router();

router.get('/:id', validateToken, blogPostsController.getById);
router.get('/', validateToken, blogPostsController.getAll);
router.post('/', validateFieldsPost, validateToken, blogPostsController.create);
router.put('/:id', validateFieldsPost, validateToken, validateOwnerPost, blogPostsController.update);
router.delete('/:id', validateToken, validateOwnerPost, blogPostsController.remove);

module.exports = router;
