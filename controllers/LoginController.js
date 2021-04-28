const { Router } = require('express');
const Login = require('../service/Login');

const router = Router();

router.post('/', async (req, res) => {
  try {
    const { email, password } = req.body;
    const response = await Login.login({ email, password });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(200).json({ token: response });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
