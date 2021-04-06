const { Router } = require('express');
const jwt = require('jsonwebtoken');
const validateJWT = require('../auth/validateJWT');
const { BlogPosts, Users } = require('../models');
const postService = require('../service/postService');

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

router.get('/post/search', validateJWT, postService.findBlogPosts);

router.get('/post/:id', validateJWT, async (req, res) => {
  try {
    const post = await BlogPosts.findAll({
      where: { id: req.params.id },
      include: [{
        model: Users, as: 'user', attributes: { exclude: ['password'] },
      }],
      attributes: { exclude: ['userId'] },
    });

    if (post.length > 0) return res.status(200).json(post[0]);
    return res.status(404).json({ message: 'Post não existe' });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.put('/post/:id', validateJWT, async (req, res) => {
  try {
    const { title, content } = req.body;
    if (!title) return res.status(400).json({ message: '"title" is required' });
    if (!content) return res.status(400).json({ message: '"content" is required' });
    const post = await BlogPosts.findByPk(req.params.id);

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const { id } = decoded.data;

    if (post.userId !== id) return res.status(401).json({ message: 'Usuário não autorizado' });

    await BlogPosts.update(
      { title, content },
      { where: { id: req.params.id } },
    );

    const postUpdated = await BlogPosts.findByPk(req.params.id);

    return res.status(200).json(postUpdated);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

router.delete('/post/:id', validateJWT, async (req, res) => {
  try {
    const post = await BlogPosts.findByPk(req.params.id);

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    const token = req.headers.authorization;
    const decoded = jwt.verify(token, secret);
    const { id } = decoded.data;

    if (post.userId !== id) return res.status(401).json({ message: 'Usuário não autorizado' });

    BlogPosts.destroy({
      where: {
        id: req.params.id,
      },
    })
      .then(() => res.send(204))
      .catch((e) => res.status(500).json({ message: e.message }));
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
});

module.exports = router;
