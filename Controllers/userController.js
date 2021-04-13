const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../Auth/createToken');
const verifyAuthorization = require('../Auth/verifyAuthorization');
const { validateDisplaynameEntries, newEmail, validatePasswordEntries, validateEmailEntries } = require('../Middlewares/userValidations');

const router = Router();
router.post('/', validateDisplaynameEntries, validatePasswordEntries, validateEmailEntries,
  newEmail, async (req, res) => {
    const { displayName, email, password, image } = req.body;

    try {
      const newUser = await Users.create({ displayName, email, password, image });
      const newToken = createToken({ displayName, email, image, id: newUser.id });
      return res.status(201).json({ token: newToken });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

router.get('/', verifyAuthorization, async (req, res) => {
  Users.findAll({ attributes: ['id', 'displayName', 'email', 'image'] })
    .then((users) => res.status(200).json(users))
    .catch((e) => res.status(500).json({ message: e.message }));
  // obs: attributes: { exclude: ['password'] }
});

router.get('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const userById = await Users.findByPk(id);
  if (userById) return res.status(200).json(userById);
  return res.status(404).json({ message: 'Usuário não existe' });
});

router.delete('/me', verifyAuthorization, (req, res) => {
  const { dataValues: { email } } = req.user;
  try {
    Users.destroy({ where: { email } });
    return res.send(204);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});
module.exports = router;
