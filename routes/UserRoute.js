const { Router } = require('express');

const { UserController } = require('../controllers');
const { validateFieldsUser } = require('../middlewares/UserMiddleware');

const router = new Router();

router.get('/:id', UserController.getById);
router.get('/', UserController.getAll);
router.post('/', validateFieldsUser, UserController.create);
// router.delete('/me', middlewares.validateToken, UserController.removeOne);

module.exports = router;
