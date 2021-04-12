const { posts } = require('../services');

const create = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { title: postTitle, content: postContent } = req.body;
    const post = await posts.create(postTitle, postContent, token);
    const { title, content, userId } = post;
    res.status(201).json({ title, content, userId });
  } catch (err) {
    next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const allPosts = await posts.getAll();
    res.status(200).json(allPosts);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await posts.getById(id);
    if (!post) return res.status(404).json({ message: 'Post não existe' });
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await posts.update(id, title, content);
    res.status(200).json(post);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  update,
};
