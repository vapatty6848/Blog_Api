const { Router } = require('express');
const { BlogPosts, Users } = require('../models');
const verifyAuthorization = require('../Auth/verifyAuthorization');
const { validateTitleEntries, validateContentEntries } = require('../Middlewares/postValidations');

const router = Router();

router.post('/', verifyAuthorization, validateTitleEntries,
  validateContentEntries, async (req, res) => {
    const { title, content } = req.body;
    const { dataValues: { id } } = req.user;
    const post = { title, content, userId: id };
    const date = new Date();
    await BlogPosts.create({ ...post, published: date, updated: date });
    return res.status(201).json(post);
  });

router.get('/', verifyAuthorization, async (req, res) => {
  const postArray = await BlogPosts.findAll({
    include: [{ model: Users, as: 'user', attributes: { exclude: ['password'] } }],
    attributes: { exclude: ['userId'] },
  });

  return res.status(200).json(postArray);
});

router.get('/:id', verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const post = await BlogPosts.findOne({
    where: { id },
    include: { model: Users, as: 'user' },
  });

  if (!post) {
    return res.status(404).json({ message: 'Post não existe' });
  }
  return res.status(200).json(post);
});

router.put('/:id', verifyAuthorization, validateTitleEntries,
  validateContentEntries, async (req, res) => {
    const { dataValues: { email } } = req.user;
    const { title, content } = req.body;
    const { id } = req.params;

    const postToUpdate = await BlogPosts.findOne({ where: { id },
      include: { model: Users, as: 'user' },
    });
    console.log('update', postToUpdate);

    if (email !== postToUpdate.dataValues.user.dataValues.email) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await BlogPosts.update({ title, content }, { where: { id } });
    const postAreadyUpdated = await BlogPosts.findOne({ where: { id } });
    return res.status(200).json({
      title: postAreadyUpdated.title,
      content: postAreadyUpdated.content,
      userId: postAreadyUpdated.userId,
    });
  });

module.exports = router;
