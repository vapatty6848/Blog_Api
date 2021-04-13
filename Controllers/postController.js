const { Router } = require('express');
const { BlogPosts } = require('../models');

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

module.exports = router;
