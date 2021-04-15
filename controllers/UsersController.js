const { Router } = require('express');
const UserServices = require('../services/UserServices');
const Utils = require('../utils');

const router = Router();

router.post('/', UserServices.createUser, UserServices.loginUser);
router.get('/', Utils.verifyToken, UserServices.getUsers);
router.get('/:id', Utils.verifyToken, UserServices.getUserById);
router.delete('/me', Utils.verifyToken, UserServices.deleteUser);

module.exports = router;
