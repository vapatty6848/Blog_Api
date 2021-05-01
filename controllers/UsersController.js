const { Router } = require('express');
const User = require('../service/User');
const { TokenValidation } = require('../auth/TokenValidation');

const router = Router();

router.get('/', TokenValidation, async (req, res) => {
  try {
    const response = await User.getAll(res);

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }
});

router.get('/:id', TokenValidation, async (req, res) => {
  const { id } = req.params;
  try {
    const response = await User.getOne({ id });
    if (response.status) return res.status(response.status).json({ message: response.message });

    return res.status(200).json(response);
  } catch (e) {
    console.log(e);
  }

  res.status(200).json({});
});

router.post('/', async (req, res) => {
  try {
    const { displayName, email, password, image } = req.body;
    const token = await User.createUser({ displayName, email, password, image }, res);
    return res.status(201).json({ token });
  } catch (e) {
    console.log(e);
  }
});

// router.put('/:id', async (req, res) => {
//   const { id } = req.params;
//   const { } = req.body;

//   res.status(200).json({});
// });

router.delete('/me', TokenValidation, async (req, res) => {
  const { id } = req.tokenUser;

  try {
    const response = await User.deleteMe({ id });
    if (response.status) return res.status(response.status).json({ message: response.message });

    return res.status(204).json({});
  } catch (e) {
    console.error(e);
  }
});

module.exports = router;
