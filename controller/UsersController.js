const { Router } = require('express');
const { User } = require('../models');
const { validingToken } = require('../validation/validingToken');
const {
  secret,
  jwtConfig,
  createJWTPayload,
  jwtSign } = require('../auth/creatingToken');
const {
  smallerToEight,
  validingEmail,
  validingPassword,
  searchEmail,
} = require('../validation/validingUser');

const routerUser = new Router();

routerUser.get('/', validingToken, async (req, res) => {
  try {
    const result = await User.findAll();
    res.status(200).json(result);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'erro no busca de todos os usuários' });
  }
});

routerUser.get('/:id', validingToken, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await User.findOne({ where: { id } });
    if (!result) {
      res.status(404).json({ message: 'Usuário não existe' });
    }
    res.status(200).json(result);
  } catch (error) {
    res.json(error);
  }
});

routerUser.post('/',
  smallerToEight,
  validingEmail,
  validingPassword,
  searchEmail, async (req, res) => {
    try {
      const user = req.body;
      const newUser = await User.create(user);
      const createPay = createJWTPayload(newUser);
      const result = jwtSign(createPay, secret, jwtConfig);
      return res.status(201).json({ token: result });
    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: 'erro no momento do post' });
    }
  });

routerUser.put('/:id',
  smallerToEight,
  validingEmail,
  validingPassword, async (req, res) => {
    const { id } = req.params;
    const { displayName, password, image } = req.body;
    await User.update(
      { displayName, password, image },
      {
        where: { id },
      },
    );
    res.status(200).json([]);
  });

routerUser.delete('/me', validingToken, async (req, res) => {
  try {
    console.log(req.payload);
    const { email } = req.userData;
    const result = await User.destroy({ where: { email } });
    return res.status(204).json(result);
  } catch (error) {
    console.error(error);
    return res.status(500).json(error);
  }
});

module.exports = routerUser;
