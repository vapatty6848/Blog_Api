const express = require('express');

const { BlogPost } = require('../models');
const postServ = require('../Service/postsValidation');
const tk = require('../Service/TokenCreate');

const postsRouter = express.Router();

postsRouter.post('/', tk.allUsersverification, postServ.createNewPost, async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.myUser;
  const createDate = new Date();
  await BlogPost.create({ title, content, userId, published: createDate, updated: createDate });
  res.status(201).json({ title, content, userId });
});

postsRouter.get('/:id', tk.allUsersverification, postServ.getPostById, async (req, res) => {
  const [post] = req.post;
  res.status(200).json(post);
});

postsRouter.get('/', tk.allUsersverification, postServ.getAllPosts, async (req, res) => {
  res.status(200).json(req.posts);
});

postsRouter.put('/:id', tk.allUsersverification, postServ.editPostById, async (req, res) => {
  const [editedPost] = req.editedPost;
  res.status(200).json(editedPost);
});

module.exports = postsRouter;
