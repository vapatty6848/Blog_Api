const { Router } = require('express');
const UserServices = require('../services/UserServices');

const router = Router();

router.post('/', UserServices.createUser, UserServices.loginUser);

module.exports = router;
