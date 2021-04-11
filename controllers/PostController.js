const { Router } = require('express');
const validateJWT = require('../utils/validateJWT');
const { st } = require('../utils/dictionary');
const { BlogPost } = require('../models');

const router = Router();

router.get('/', async (req, res) => {
  const posts = await BlogPost.findAll();

  res.status(200).json(posts);
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
