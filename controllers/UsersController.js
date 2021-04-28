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

// router.get('/:id', async (req, res) => {
//   const { id } = req.params;

//   res.status(200).json({});
// });

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

// router.delete('/:id', async (req, res) => {
//   const { id } = req.params;

//   res.status(200).json({});
// });

module.exports = router;
