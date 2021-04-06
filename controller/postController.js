const { Router } = require('express');
const jwt = require('jsonwebtoken');
const validateJWT = require('../auth/validateJWT');
const { BlogPosts, Users } = require('../models');

const router = Router();

const secret = 'secret';

router.post('/post', validateJWT, (req, res) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });

  try {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const { userId = 1 } = decoded.data;

    const post = { title, content, userId };
    console.log(new Date());

    BlogPosts.create({ ...post, published: new Date().toLocaleString() })
      .then(() => res.status(201).json(post))
      .catch((e) => res.status(500).json({ message: e.message }));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.get('/post', validateJWT, (req, res) => {
  BlogPosts.findAll({
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
    attributes: { exclude: ['userId'] },
  })
    .then((answer) => res.status(200).json(answer))
    .catch((e) => res.status(500).json({ message: e.message }));
});

module.exports = router;
