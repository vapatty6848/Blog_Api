const express = require('express');

const { User, BlogPost } = require('../models');

const validateToken = require('../middlewares/validateToken');

const validationPost = require('../middlewares/validationPost');

const router = express.Router();

router.post('/', validateToken, validationPost, (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  User.findOne({ where: { email } })
    .then((user) => {
      BlogPost.create({ title, content, userId: user.id })
        .then(() => res.status(201).json({ title, content, userId: user.id }))
        .catch((e) => {
          console.log(e.message);
          res.status(500).send({ message: 'Algo deu errado' });
        });
    });
});

module.exports = router;
