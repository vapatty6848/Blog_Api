const { BlogPost } = require('../models');

const DeleteBlogPostService = async (userId, blogPostId) => {
  await BlogPost.destroy({
    where: { id: blogPostId, userId },
  });
};

module.exports = DeleteBlogPostService;
