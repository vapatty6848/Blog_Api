const { Router } = require('express');

const { validateLogin } = require('../utils/LoginValidation');
const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { st } = require('../utils/dictionary');

const router = Router();

// LOGIN
router.post('/', async (req, res) => {
  const user = req.body;

  let { status, ms } = validateLogin(user.email, user.password);

  if (!ms.length) {
    const userExists = await User.findAll({ where: { email: user.email } });
    if (!userExists.length) {
      ms = 'Campos inválidos';
      return res.status(status).json({ message: ms });
    }

    const token = await generateToken(user);

    ms = { token };
    status = st.OK;
    return res.status(status).json({ token });
  }

  return res.status(status).json({ message: ms });
});

module.exports = router;
