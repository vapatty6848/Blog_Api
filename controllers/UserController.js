const UserRouter = require('express').Router();
const createToken = require('../Auth/createToken');
const { userServices } = require('../services');
const { User } = require('../models');
const verifyAuthorization = require('../middleware/verifyAuthorization');

UserRouter.post('/', userServices.validateRegister, async (req, res) => {
  const CANNOT = 400;
  try {
    const { displayName, email, password, image } = req.body;
    await User.create({ displayName, email, password, image });
    const [id] = await User.findAll({ where: { email }, attributes: ['id', 'displayName', 'email', 'image'] });
    const token = await createToken({ id, displayName, email, image });
    return res.status(201).send({ token });
  } catch (err) {
    res.status(CANNOT).send({ message: err.message });
  }
});

UserRouter.get('/', verifyAuthorization, async (req, res) => {
  const data = await User.findAll({ attributes: ['id', 'displayName', 'email', 'image'] });
  return res.status(200).json(data);
});

UserRouter.get('/:id', verifyAuthorization, async (req, res) => {
  try {
    const data = await User.findByPk(req.params.id, { attributes: ['id', 'displayName', 'email', 'image'] });
    if (!data || data === null) throw new Error('Usuário não existe');
    return res.status(200).json(data);
  } catch (err) {
    return res.status(404).json({ message: err.message });
  }
});

module.exports = UserRouter;
