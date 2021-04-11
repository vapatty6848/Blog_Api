const { Router } = require('express');

const userController = require('../controllers/UserController');
const { validateFieldsUser } = require('../middlewares/UserMiddleware');
const { validateToken } = require('../middlewares/CheckToken');

const router = new Router();

router.get('/:id', validateToken, userController.getById);
router.get('/', validateToken, userController.getAll);
router.post('/', validateFieldsUser, userController.create);
router.delete('/me', validateToken, userController.remove);

module.exports = router;
