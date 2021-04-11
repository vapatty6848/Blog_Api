const { Router } = require('express');
const validateJWT = require('../utils/validateJWT');
const { st } = require('../utils/dictionary');
const { BlogPost, User } = require('../models');

const router = Router();

router.get('/', validateJWT, async (req, res) => {
  const posts = await BlogPost.findAll({
    attributes: ['id', 'published', 'updated', 'title', 'content'],
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });

  res.status(st.OK).json(posts);
});

router.get('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;

  const post = await BlogPost.findOne({
    where: { id },
    attributes: ['id', 'published', 'updated', 'title', 'content'],
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });

  if (!post) return res.status(st.NOT_FOUND).json({ message: 'Post não existe' });

  res.status(st.OK).json(post);
});

router.post('/', validateJWT, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.user.dataValues;

  if (!title) return res.status(st.BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(st.BAD_REQUEST).json({ message: '"content" is required' });

  await BlogPost.create({ title, content, userId: id });

  res.status(st.CREATED).json({
    title,
    content,
    userId: id,
  });
});

module.exports = router;
