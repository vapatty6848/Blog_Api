const { Router } = require('express');

const PostController = require('../controllers/PostController');

const ensureAuth = require('../middlewares/ensureAuth');
const validatePostInfo = require('../middlewares/validatePostInfo');

const postController = new PostController();

const postRoutes = Router();

postRoutes.get('/', ensureAuth, postController.show);
postRoutes.get('/search', ensureAuth, postController.search);
postRoutes.get('/:id', ensureAuth, postController.find);

postRoutes.post('/', ensureAuth, validatePostInfo, postController.create);

postRoutes.put('/:id', ensureAuth, validatePostInfo, postController.update);

postRoutes.delete('/:id', ensureAuth, postController.delete);

module.exports = postRoutes;
