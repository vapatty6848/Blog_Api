const { Router } = require('express');
const createToken = require('../Auth/createToken');
const { Users } = require('../models');
const { validateLoginPasswordNotEmpty, validateLoginNotEmpty, userEmail, validateLoginPasswordEntries, validateLoginEmailEntries } = require('../Middlewares/userValidations');

const router = Router();
router.post('/', validateLoginNotEmpty, validateLoginEmailEntries, validateLoginPasswordNotEmpty, validateLoginPasswordEntries, userEmail, async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Users.findOne({ where: { email } });
    console.log('user password', user.dataValues.password);
    if (user.dataValues.password !== password) return res.status(400).json({ message: 'Campos inválidos' });
    const { displayName, image } = user.dataValues;
    const token = createToken({ displayName, email, image });

    return res.status(200).json({ token });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
