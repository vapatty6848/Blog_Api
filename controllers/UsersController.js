const { Router } = require('express');

const router = Router();

const { validateUser } = require('../utils/userValidation');
const validateJWT = require('../utils/validateJWT');
const generateToken = require('../utils/generateToken');
const { User } = require('../models');
const { st } = require('../utils/dictionary');

// GET ALL
router.get('/', validateJWT, async (req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  res.status(st.OK).json(users);
});

// FIND BY ID
router.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) return res.status(st.NOT_FOUND).json({ message: 'Usuário não existe' });

  res.status(st.OK).json(user);
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
