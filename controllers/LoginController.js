const { Router } = require('express');
const Login = require('../service/Login');

const router = Router();

router.post('/', async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await Login.login({ email, password, res });
    return res.status(200).json({ token });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
