const Sequelize = require('sequelize');

const { Op } = Sequelize;
const { Router } = require('express');
const validateJWT = require('../utils/validateJWT');
const { st } = require('../utils/dictionary');
const { BlogPost, User } = require('../models');

const router = Router();

router.get('/search', validateJWT, async (req, res) => {
  const { q } = req.query;

  if (!q) {
    const allPosts = await BlogPost.findAll({
      attributes: ['id', 'published', 'updated', 'title', 'content'],
      include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
    });
    return res.status(200).json(allPosts);
  }

  const posts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ],
    },
    attributes: ['id', 'published', 'updated', 'title', 'content'],
    include: { model: User, as: 'user', attributes: { exclude: ['password'] } },
  });
  return res.status(200).json(posts || []);
});

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

router.put('/:id', validateJWT, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const userId = req.user.dataValues.id;

  const { dataValues } = await BlogPost.findOne({ where: { id } });

  if (!title) return res.status(st.BAD_REQUEST).json({ message: '"title" is required' });
  if (!content) return res.status(st.BAD_REQUEST).json({ message: '"content" is required' });
  if (dataValues.userId !== userId) return res.status(st.UNAUTHORIZED).json({ message: 'Usuário não autorizado' });

  await BlogPost.update({ title, content }, { where: { id } });

  res.status(200).json({ title, content, userId });
});

module.exports = router;
