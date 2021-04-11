const blogPostService = require('../services/BlogPostsService');

const { OK, CREATED, NOT_FOUND, NO_CONTENT } = require('../schema/statusSchema');

// *** CREATE NEW POST ***
const create = async (req, res) => {
  const { title, content } = req.body;
  const post = { title, content, user_id: req.user.id };
  const postCreated = await blogPostService.create(post);

  res.status(CREATED).json({
    title: postCreated.title,
    content: postCreated.content,
    userId: postCreated.user_id,
  });
};

// *** GET ALL POSTS ***
const getAll = async (req, res) => {
  const posts = await blogPostService.getAll();

  res.status(OK).json(posts);
};

// *** GET POST BY ID ***
const getById = async (req, res) => {
  const { id } = req.params;

  const post = await blogPostService.getById(id);
  if (!post) return res.status(NOT_FOUND).json({ message: 'Post não existe' });

  res.status(OK).json(post);
};

// *** DELETE POST ***
const remove = async (req, res) => {
  const { id } = req.params;

  await blogPostService.remove(id);

  res.status(NO_CONTENT).json();
};

// *** UPDATE POST ***
const update = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;

  await blogPostService.update({ title, content }, id);

  res.status(OK).json({ title, content, userId: req.user.id });
};

module.exports = {
  create,
  getAll,
  getById,
  remove,
  update,
};
