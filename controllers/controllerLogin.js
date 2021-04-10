const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();

router.post('/', rescue(async (req, res) => {
  const { email, password } = req.body;

  const token = req.headers.authorization;

  await ({ email, password });
  return res.status(200).json({ token });
}));

module.exports = router;
