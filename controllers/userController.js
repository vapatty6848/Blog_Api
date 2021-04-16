const { Router } = require('express');

const { Users } = require('../models');

const router = Router();

const createToken = require('../auth/createToken');
const checkUser = require('../middleware/checkUser');
//  const checkAuthorization = require('../middleware/checkAuthorization');
//  const checkUserId = require('../middleware/checkUserById');

router.post('/', checkUser, async (req, res) => {
  const { displayName, email, password, image } = req.body;
  const payload = { displayName, email, password, image };
  const token = await createToken(payload);
  await Users.create({ displayName, email, password, image });
  res.status(201).json({ token });
});

/*  router.get('/', checkAuthorization, async (_req, res) => {
  const users = await Users.findAll();
  res.status(200).json(users);
});
router.get('/:id', checkAuthorization, checkUserId, async (req, res) => {
  const { id } = req.params;
  const [{ dataValues }] = await Users.findAll({
    where: {
      id,
    },
  });
  res.status(200).json(dataValues);
});
router.delete('/me', checkAuthorization, async (req, res) => {
  const { email } = req.payload;
  await Users.destroy({
    where: {
      email,
    },
  });
  res.status(204).end();
});
*/
module.exports = router;
