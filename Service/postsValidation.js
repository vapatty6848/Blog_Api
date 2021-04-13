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

const getPostById = async (req, res, next) => {
  const { id } = req.params;
  const post = await BlogPost.findAll({
    where: { id },
    include: { model: User,
      as: 'user',
      attribute: { exclude: ['password'] } },
  });
  console.log('post', post);
  if (post.length === 0) return next(createError('Post não existe', 404));
  req.post = post;
  next();
};

const editPostById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  const { id: userId } = req.myUser;
  const postInfo = await BlogPost.findOne({ where: { id } });
  if (postInfo.dataValues.userId !== userId) return next(createError('Usuário não autorizado', 401));

  const editedPost = await BlogPost.update({ title, content }, { where: { id } });

  if (editedPost.length === 0) return next(createError('Post não existe', 404));
  next();
};

const deletePost = async (req, res, next) => {
  const { id } = req.params;
  const { id: userId } = req.myUser;
  const postInfo = await BlogPost.findOne({ where: { id } });
  console.log('postInfo', postInfo);
  if (!postInfo) return next(createError('Post não existe', 404));

  if (postInfo.dataValues.userId !== userId) return next(createError('Usuário não autorizado', 401));

  await BlogPost.destroy({ where: { id } });
  next();
};

module.exports = {
  createNewPost,
  getPostById,
  editPostById,
  deletePost,
};
