const { Router } = require('express');

const router = Router();

// const checkAuthorization = require('../middleware/checkAuthorization');
const checkLogin = require('../middleware/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  const token = req.payload;
  res.status(200).json({ token });
});

module.exports = router;
