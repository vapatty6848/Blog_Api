const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();

const { createNewUser, listAllUsers, IdUsers } = require('../services/userService');

const createToken = require('../middlewares/Req1/createToken');

const { verifications, checkEmailUser } = require('../middlewares/Req1/verifications');

const { usersAuthorized } = require('../middlewares/Req1/validateToken');

router.get('/', usersAuthorized, rescue(async (_req, res) => {
  const users = await listAllUsers();

  res.status(200).json(users);
}));

router.get('/:id', usersAuthorized, rescue(async (req, res) => {
  const { id } = req.params;

  const [user] = await IdUsers(id);
  if (!user) return res.status(404).json({ message: 'Usuário não existe' });
  return res.status(200).json(user);
}));

router.post('/', verifications, checkEmailUser, rescue(async (req, res) => {
  const { displayName, email, password, image } = req.body;

  await createNewUser(displayName, email, password, image);
  const userToken = { displayName, email };
  const token = createToken(userToken);
  res.status(201).json({ token });
}));

// router.put('/:id', rescue(async (req, res) => {
//   const { id } = req.params;
//   const { displayName, email, password, image } = req.body;

//   const user = await User.update({ displayName, email, password, image }, {
//     where: { id },
//   });

//   res.status(200).json(user);
// }));

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   await User.destroy(
//     {
//       where: { id },
//     },
//   );

//   res.status(204).end();
// });

module.exports = router;
