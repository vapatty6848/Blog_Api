const { BlogPosts, Users } = require('../models');

const createPost = async (post) => BlogPosts.create(post);

const findPosts = () => BlogPosts.findAll({ include: { model: Users, as: 'user' } });

const findPostById = (id) => BlogPosts.findByPk(id, { include: { model: Users, as: 'user' } });

const findPostAuthor = (authorId) => BlogPosts.findAll({
  where: { userId: authorId },
});

const editPost = (idPost, idAuthor, postTitle, postContent) => BlogPosts.update(
  { title: postTitle, content: postContent },
  {
    where: { id: idPost, userId: idAuthor },
  },
);

const deletePost = (idPost, idAuthor) => {
  BlogPosts.destroy({
    where: {
      id: idPost, userId: idAuthor,
    },
  });
};

module.exports = {
  createPost,
  findPosts,
  findPostById,
  editPost,
  deletePost,
  findPostAuthor,
};
