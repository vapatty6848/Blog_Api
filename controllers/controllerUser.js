const { Router } = require('express');
const rescue = require('express-rescue');

const router = Router();

const { createNewUser } = require('../services/userService');

const createToken = require('../middlewares/Req1/createToken');

const { verifications, checkEmailUser } = require('../middlewares/Req1/verifications');

// router.get('/', rescue(async (req, res) => {
//   const user = await User.findAll();

//   res.status(200).json(user);
// }));

// router.get('/:id', rescue(async (req, res) => {
//   const { id } = req.params;

//   const user = await User.findByPk(id);

//   res.status(200).json(user);
// }));

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
