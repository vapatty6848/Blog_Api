const express = require('express');
// const { StatusCodes } = require('http-status-codes');
// const { createToken } = require('../middlewares/tokenJWT');

const router = express.Router();

router.post('/', async (req, res) => {
  res.send('post');
});

module.exports = router;
