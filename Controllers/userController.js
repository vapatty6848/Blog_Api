const { Router } = require('express');
const jwt = require('jsonwebtoken');
const { Users } = require('../models');
const createToken = require('../Auth/createToken');
const verifyAuthorization = require('../Auth/verifyAuthorization');
const { validateDisplaynameEntries, newEmail, validatePasswordEntries, validateEmailEntries } = require('../Middlewares/userValidations');

const mySecretKey = 'Hey-Ho!';

const router = Router();
router.post('/', validateDisplaynameEntries, validatePasswordEntries, validateEmailEntries,
  newEmail, (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newToken = createToken({ displayName, email, image });

    Users.create({ displayName, email, password, image })
      .then(() => res.status(201).json({ token: newToken }))
      .catch((e) => res.status(500).json({ message: e.message }));
  });

router.get('/', verifyAuthorization, async (req, res) => {
  Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })
    .then((users) => res.status(200).json(users))
    .catch((e) => res.status(500).json({ message: e.message }));
});

router.get('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const userById = await Users.findByPk(id);
  if (userById) return res.status(200).json(userById);
  return res.status(404).json({ message: 'Usuário não existe' });
});

router.delete('/me', verifyAuthorization, (req, res) => {
  try {
    const token = req.headers.authorization;
    const user = jwt.verify(token, mySecretKey);
    console.log('user', user);
    const { email } = user;
    Users.destroy({ where: { email } });
    return res.send(204);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
