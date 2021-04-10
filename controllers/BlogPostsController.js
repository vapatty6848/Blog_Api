const blogPostService = require('../services/BlogPostsService');
const { verifyToken } = require('../middlewares/CheckToken');

const { OK, CREATED, UNAUTHORIZED } = require('../schema/statusSchema');

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

// // *** GET POST BY ID ***
// const getById = async (req, res) => {
//   const { id } = req.params;
//   const validation = await verifyToken(req.headers.authorization);
//   if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

//   const user = await userService.getById(id);
//   if (!user) return res.status(NOT_FOUND).json({ message: 'Usuário não existe' });

//   res.status(OK).json(user);
// };

// // *** GET POST BY ID ***
// const remove = async (req, res) => {
//   const validation = await verifyToken(req.headers.authorization);
//   if (validation.message) return res.status(UNAUTHORIZED).json({ message: validation.message });

//   const { id } = validation.user;
//   const result = await userService.remove(id);
//   if (result.message) return res.status(NOT_FOUND).json({ message: result.message });

//   res.status(NO_CONTENT).json();
// };

module.exports = {
  create,
  getAll,
  // getById,
  // remove,
};
