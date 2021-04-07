const { Router } = require('express');

const router = Router();

const { validateUser } = require('../utils/userValidation');
const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { st } = require('../utils/dictionary');

// GET ALL
router.get('/', async (req, res) => {
  const users = await User.findAll();

  res.status(200).json(users);
});

// CREATE USER
router.post('/', async (req, res) => {
  const { displayName, email, password, image } = req.body;
  let { status, ms } = validateUser(req.body);

  if (!ms.length) {
    const userExists = await User.findAll({ where: { email } });
    if (userExists.length) {
      ms = 'Usuário já existe';
      return res.status(st.CONFLICT).json({ message: ms });
    }

    const { dataValues } = await User.create({ displayName, email, password, image });
    const token = await generateToken(dataValues);

    ms = { token };
    status = st.CREATED;
    return res.status(status).json({ token });
  }

  return res.status(status).json({ message: ms });
});

module.exports = router;
