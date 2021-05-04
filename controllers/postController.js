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

router.put('/:id', validateToken, validationPost, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { userId } = await BlogPost.findByPk(id);

  if (req.user.id !== userId) return res.status(401).json({ message: 'Usuário não autorizado' });

  await BlogPost.update({ title, content }, { where: { id } })

  res.status(200).json({ title, content, userId });

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
