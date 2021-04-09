const { BlogPost } = require('../models');

const BlogPostUpdateService = async (title, content, userId, blogPostId) => {
  await BlogPost.update({ title, content }, {
    where: {
      id: blogPostId,
      userId,
    },
  });
};

module.exports = BlogPostUpdateService;
