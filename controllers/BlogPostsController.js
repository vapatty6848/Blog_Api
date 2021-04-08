const { Router } = require('express');
const { BlogPost, User } = require('../models');
const verifyAuth = require('../schemas/verifyAuth');
const { validatePost } = require('../schemas/postsValidation');
const {
  OK, SUCCESS, INTERNAL_SERVER_ERROR, NOT_FOUND,
} = require('../document/HTTPStatus');

const router = new Router();

router.post('/', verifyAuth, validatePost, async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;
    const newDate = new Date().toLocaleString();

    await BlogPost.create({
      title, content, userId, published: newDate, updated: newDate,
    });

    return res.status(SUCCESS).json({ title, content, userId });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

router.get('/', verifyAuth, async (_req, res) => {
  try {
    const posts = await BlogPost.findAll({
      attributes: { exclude: ['userId'] },
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      }],
    });

    return res.status(OK).json(posts);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

router.get('/:id', verifyAuth, async (req, res) => {
  try {
    const { id } = req.params;

    const post = await BlogPost.findByPk(id, {
      attributes: { exclude: ['userId'] },
      include: [{
        model: User, as: 'user', attributes: { exclude: ['password'] },
      }],
    });

    if (!post) return res.status(NOT_FOUND).json({ message: 'Post não existe' });

    return res.status(OK).json(post);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
  }
});

// router.delete('/me', verifyAuth, async (req, res) => {
//   try {

//     return res.status(NO_CONTENT).end();
//   } catch (err) {
//     return res.status(INTERNAL_SERVER_ERROR).json({ message: 'Internal Server Error' });
//   }
// });

module.exports = router;
