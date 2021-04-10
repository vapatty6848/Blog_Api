const { Router } = require('express');

const userController = require('../controllers/UserController');
const { validateFieldsUser } = require('../middlewares/UserMiddleware');

const router = new Router();

router.get('/:id', userController.getById);
router.get('/', userController.getAll);
router.post('/', validateFieldsUser, userController.create);
router.delete('/me', userController.remove);

module.exports = router;
