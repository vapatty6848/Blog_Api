const router = require('express').Router();

const { createToken } = require('../auth');
const { userValidation, loginValidation } = require('../middlewares');
const { User } = require('../models');

router.post(
  '/',
  userValidation.verifyName,
  userValidation.verifyEmail,
  userValidation.verifyPassword,
  userValidation.verifyUserExists,
  async (req, res) => {
    try {
      const { displayName, email, password, image } = req.body;

      const user = await User.create({ displayName, email, password, image });

      const token = createToken({ id: user.dataValues.id, email, displayName, image });

      return res.status(201).json({ token });
    } catch (error) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  },
);

router.get('/', loginValidation.verifyToken, async (_req, res) => {
  const users = await User.findAll({ attributes: { exclude: ['password'] } });

  return res.status(200).json(users);
});

router.get('/:id', loginValidation.verifyToken, async (req, res) => {
  const { id } = req.params;

  const user = await User.findByPk(id, { attributes: { exclude: ['password'] } });

  if (!user) {
    return res.status(404).json({ message: 'Usuário não existe' });
  }

  return res.status(200).json(user);
});

router.delete('/me', loginValidation.verifyToken, async (req, res) => {
  const { email } = req.user;

  await User.destroy({ where: { email } });

  return res.status(204).json({ message: 'Usuário deletado com sucesso' });
});

module.exports = router;
