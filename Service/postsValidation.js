const { User, BlogPost } = require('../models');

const createError = (message, status) => ({ message, status });

const createNewPost = async (req, res, next) => {
  const { title, content } = req.body;
  if (!title) {
    return next(createError('"title" is required', 400));
  }
  if (!content) {
    return next(createError('"content" is required', 400));
  }
  next();
};

// const getAllPosts = async (req, res, next) => {
//   const posts = await BlogPost.findAll({
//     include: { model: User,
//       as: 'user',
//       attributes: { exclude: ['password'] } },
//     attribude: { exclude: ['userId'] } });
//   req.posts = posts;
//   next();
// };

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findAll({
    where: { id },
    include: { model: User,
      as: 'user',
      attribute: { exclude: ['password'] } },
    attribude: { exclude: ['userId'] } });
  console.log('post', post);
  if (!post) return next(createError('Post não existe', 404));
  req.post = post;
  next();
};

const editPostById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const editedPost = await BlogPost.update({ title, content }, {
    where: { id },
    include: { model: User,
      as: 'user',
      attributes: { exclude: ['password'] } },
    attribudes: { exclude: ['userId'] } });
  console.log('editedPost', editedPost);
  if (!editedPost) return next(createError('Post não existe', 404));
  req.editedPost = editedPost;
  next();
};

module.exports = {
  createNewPost,
  // getAllPosts,
  getPostById,
  editPostById,
};
