const express = require('express');

const generateToken = require('../middlewares/generateToken');

const validationLogin = require('../middlewares/validationLogin');

const router = express.Router();

router.post('/', generateToken, validationLogin);

module.exports = router;
