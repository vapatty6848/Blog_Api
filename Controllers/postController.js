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
    include: [{
      model: Users, as: 'user', attributes: { exclude: ['password'] },
    }],
    attributes: { exclude: ['userId'] },
  });
  console.log('array', postArray);
  return res.status(200).json(postArray);
});
module.exports = router;
