const { Router } = require('express');
const { BlogPost } = require('../models');

const routerBlog = new Router();

routerBlog.get('/', async (req, res) => {
  const result = await BlogPost.findAll();
  res.status(200).json(result);
});

routerBlog.get('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await BlogPost.findByPk(id);
  res.status(200).json(result);
});

routerBlog.post('/', async (req, res) => {
  const blog = req.body;
  const result = await BlogPost.create(blog);
  res.status(201).json(result);
});

routerBlog.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, content, userId, published } = req.body;
  await BlogPost.update(
    { title, content, userId, published },
    {
      where: { id },
    },
  );
  res.status(200).json([]);
});

routerBlog.delete('/', async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy(
    {
      where: { id },
    },
  );
  res.status(204).json([]);
});

module.exports = routerBlog;
