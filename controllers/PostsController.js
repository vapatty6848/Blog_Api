const express = require('express');
const { Op } = require('sequelize');

const { BlogPost, User } = require('../models');
const postServ = require('../Service/postsValidation');
// const tken = require('../Service/TokenCreate');
const tk = require('../Service/TokenValidad');

const postsRouter = express.Router();

postsRouter.post('/', tk.allUsersverification, postServ.createNewPost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.myUser;
  const createDate = new Date();
  await BlogPost.create({ title, content, userId, published: createDate, updated: createDate });
  return res.status(201).json({ title, content, userId });
});

postsRouter.get('/search', tk.allUsersverification, async (req, res) => {
  const { q } = req.query;
  const post = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.substring]: q } }, { content: { [Op.substring]: q } }] },
    include: { model: User,
      as: 'user',
      attributes: { exclude: ['password'] } } });

  res.status(200).json(post);
});

postsRouter.get('/:id', tk.allUsersverification, postServ.getPostById, async (req, res) => {
  const [post] = req.post;
  res.status(200).json(post);
});

postsRouter.get('/', tk.allUsersverification, async (req, res) => {
  const posts = await BlogPost.findAll({
    include: { model: User,
      as: 'user',
      attributes: { exclude: ['password'] } },
  });
  res.status(200).json(posts);
});

postsRouter.put('/:id', tk.allUsersverification, postServ.createNewPost, postServ.editPostById, async (req, res) => {
  const { id } = req.myUser;
  const { title, content } = req.body;
  const idNumber = parseInt(id, 10);
  res.status(200).json({ title, content, userId: idNumber });
});

postsRouter.delete('/:id', tk.allUsersverification, postServ.deletePost, async (req, res) => {
  res.status(204).json();
});

module.exports = postsRouter;
