const { Router } = require('express');
const { Op } = require('sequelize');

const { BlogPosts, Users } = require('../models');

const router = Router();

const checkPost = require('../middleware/checkPost');
const checkPostId = require('../middleware/checkPostId');
const CheckUserId = require('../middleware/checkOwner');
const checkSearch = require('../middleware/checkSearch');
const checkAuthorization = require('../middleware/checkAuthorization');

router.post('/', checkPost, checkAuthorization, async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.payload;
  const { id } = await Users.findOne({
    where: {
      email,
    },
  });
  const userId = id;
  await BlogPosts.create({ title, content, userId });
  res.status(201).json({ title, content, userId });
});

router.get('/', checkAuthorization, async (req, res) => {
  const allPosts = await BlogPosts.findAll({
    include: { association: 'user', attributes: { exclude: ['password'] } },
  });

  res.status(200).json(allPosts);
});

router.get('/search', checkAuthorization, checkSearch, async (req, res) => {
  const { q } = req.query;

  try {
    const [{ dataValues }] = await BlogPosts.findAll({
      where: {
        [Op.or]: [{ title: { [Op.like]: `%${q}%` } }, { content: { [Op.like]: `%${q}%` } }],
      },
      include: { association: 'user', attributes: { exclude: ['password'] } },
    });

    return res.status(200).json(dataValues);
  } catch (e) {
    return res.status(200).json([]);
  }
});

router.get('/:id', checkAuthorization, checkPostId, async (req, res) => {
  const { id } = req.params;
  const [{ dataValues }] = await BlogPosts.findAll({
    where: { id },
    include: { association: 'user', attributes: { exclude: ['password'] } },
  });
  res.status(200).json(dataValues);
});

router.put('/:id', checkAuthorization, CheckUserId, async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const user = req.payload;
  await BlogPosts.update({ title, content }, { where: { id } });
  const [{ dataValues }] = await Users.findAll({ where: { email: user.email } });
  res.status(200).json({ title, content, userId: dataValues.id });
});

router.delete('/:id', checkAuthorization, checkPostId, async (req, res) => {
  const { id } = req.params;
  await BlogPosts.destroy({
    where: { id },
  });
  res.status(200).end();
});

module.exports = router;
