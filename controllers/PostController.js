const { Router } = require('express');

const { BlogPosts, Users } = require('../models');

const router = Router();

const checkPost = require('../middleware/checkPost');
const checkPostId = require('../middleware/checkPostId');
const CheckUserId = require('../middleware/checkOwner');

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

/* router.get('/search?q=:searchTerm', async (req, res) => {
  const { searchTerm } = req.query;
  console.log('ESTOU AKI', searchTerm);

  res.status(200).json('ok');
}); */
module.exports = router;
