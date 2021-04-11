const blogPostService = require('../services/BlogPostsService');
const { verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED, NOT_FOUND, NO_CONTENT } = require('../schema/statusSchema');

// *** CREATE NEW POST ***
const create = async (req, res) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const { title, content } = req.body;
  const post = { title, content, user_id: validation.user.id };
  const postCreated = await blogPostService.create(post);

  res.status(CREATED).json({
    title: postCreated.title,
    content: postCreated.content,
    userId: postCreated.user_id,
  });
};

// *** GET ALL POSTS ***
const getAll = async (req, res) => {
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

  const posts = await blogPostService.getAll();

  res.status(OK).json(posts);
};

// *** GET POST BY ID ***
const getById = async (req, res) => {
  const { id } = req.params;
  const validation = await verifyToken(req.headers.authorization);
  if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

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

module.exports = {
  create,
  getAll,
  getById,
  remove,
};
