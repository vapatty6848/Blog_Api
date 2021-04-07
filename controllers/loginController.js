const { Router } = require('express');

const router = Router();

// const checkAuthorization = require('../middleware/checkAuthorization');
const createToken = require('../auth/createToken');
const checkLogin = require('../middleware/checkLogin');

router.post('/', checkLogin, async (req, res) => {
  const { displayName, email, password, image } = req.payload;
  const token = await createToken({ displayName, email, password, image });
  res.status(200).json({ token });
});

module.exports = router;
