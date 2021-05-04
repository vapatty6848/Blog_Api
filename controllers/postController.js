const express = require('express');

const { User, BlogPost } = require('../models');

const validateToken = require('../middlewares/validateToken');

const validationPost = require('../middlewares/validationPost');

const router = express.Router();

router.get('/', validateToken, (_req, res) => {
  BlogPost.findAll()
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.post('/', validateToken, validationPost, (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;

  User.findOne({ where: { email } })
    .then((user) => {
      BlogPost.create({ title, content, user })
        .then(() => res.status(201).json({ title, content, userId: user.id }))
        .catch((e) => {
          console.log(e.message);
          res.status(500).send({ message: 'Algo deu errado' });
        });
    });
});

module.exports = router;
