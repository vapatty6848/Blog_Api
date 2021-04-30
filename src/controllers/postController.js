const router = require('express').Router();

const { postValidation, loginValidation } = require('../middlewares');
const { Post, User, Sequelize: { Op } } = require('../models');

router.post(
  '/',
  loginValidation.verifyToken,
  postValidation,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.user;

      const newPost = await Post.create({ title, content, userId: id });

      return res.status(201).json(newPost);
    } catch (_err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  },
);

router.get('/', loginValidation.verifyToken, async (_req, res) => {
  try {
    const posts = await Post.findAll({
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });

    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.get('/:id', loginValidation.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findOne({
      where: { id },
      include: {
        model: User,
        as: 'user',
        attributes: { exclude: ['password'] },
      },
      attributes: { exclude: ['userId'] },
    });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    return res.status(200).json(post);
  } catch (error) {
    return res.status(500).json({ message: error });
  }
});

router.put(
  '/:id',
  loginValidation.verifyToken,
  postValidation,
  async (req, res) => {
    try {
      const { title, content } = req.body;
      const { id } = req.params;
      const userId = req.user.id;

      const updatedPost = await Post.update({ title, content, userId }, { where: { id, userId } });

      if (updatedPost[0] === 0) {
        return res.status(401).json({ message: 'Usuário não autorizado' });
      }

      const postUpdated = await Post.findOne({
        where: { id },
      });

      return res.status(200).json(postUpdated);
    } catch (_err) {
      return res.status(500).json({ message: 'algo deu errado' });
    }
  },
);

router.delete('/:id', loginValidation.verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const post = await Post.findOne({ where: { id } });

    if (!post) return res.status(404).json({ message: 'Post não existe' });

    const deletedPost = await Post.destroy({ where: { id, userId } });

    if (deletedPost === 0) return res.status(401).json({ message: 'Usuário não autorizado' });

    return res.status(204).end();
  } catch (err) {
    return res.status(500).json({ message: 'algo deu errado' });
  }
});

router.get(
  '/search',
  loginValidation.verifyToken,
  async (req, res) => {
    const { q } = req.query;

    const searchedPost = await Post.findAll({
      where: {
        [Op.or]: [
          { title: { [Op.like]: `%${q}%` } },
          { content: { [Op.like]: `%${q}%` } },
        ],
      },
      include: 'user',
    });

    return res.status(200).json(searchedPost);
  },
);

module.exports = router;
