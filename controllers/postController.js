const express = require('express');

const { User, BlogPost } = require('../models');

const validateToken = require('../middlewares/validateToken');

const validationPost = require('../middlewares/validationPost');

const router = express.Router();

router.get('/', validateToken, (_req, res) => {
  BlogPost.findAll({
    include: { association: 'user', attributes: { exclude: ['password'] } },
    attributes: { exclude: ['userId'] },
  })
    .then((posts) => {
      res.status(200).json(posts);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.get('/:id', validateToken, (req, res) => {
  const { id } = req.params;
  BlogPost.findByPk(id, {
    include: { association: 'user', attributes: { exclude: ['password'] } },
    attributes: { exclude: ['userId'] },
  })
    .then((post) => {
      if (post === null) {
        return res.status(404).send({ message: 'Post não existe' });
      }
      res.status(200).json(post);
    });
});

router.put('/:id', validateToken, validationPost, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  BlogPost.update({ title, content }, { where: { id } })
    .then((post) => {
      const { userId } = post;
      if (req.user.id !== userId) res.status(401).json({ message: 'Usuário não autorizado' });
      res.status(200).json({ title, content, userId });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
});

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
