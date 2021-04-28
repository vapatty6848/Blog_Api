const { Router } = require('express');
const Login = require('../service/Login');

const router = Router();

router.post('/', async (req, res) => {
  try {
    console.log('body from login', req.body);
    const { email, password } = req.body;
    console.log('não deu erro no destructuring');
    const response = await Login.login({ email, password });
    if (response.status) return res.status(response.status).json({ message: response.message });
    return res.status(200).json({ response });
  } catch (e) {
    console.log(e);
  }
});

module.exports = router;
