const { Router } = require('express');
const { Users } = require('../models');
const createToken = require('../Auth/createToken');
const { validateDisplaynameEntries, newEmail, validatePasswordEntries, validateEmailEntries } = require('../Middlewares/userValidations');

const router = Router();
router.post('/', validateDisplaynameEntries, validatePasswordEntries, validateEmailEntries,
  newEmail, (req, res) => {
    const { displayName, email, password, image } = req.body;
    const newToken = createToken({ displayName, email, image });

    Users.create({ displayName, email, password, image })
      .then(() => res.status(201).json({ token: newToken }))
      .catch((e) => res.status(500).json({ message: e.message }));
  });

module.exports = router;
