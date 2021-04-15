const { Router } = require('express');

const { BlogPosts, Users } = require('../models');

const router = Router();

const checkPost = require('../middleware/checkPost');

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
  const allPosts = await BlogPosts.findAll();

  res.status(201).json(allPosts);
});

module.exports = router;
