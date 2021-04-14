const { BlogPost } = require('../../database/models');

module.exports = {
  async execute({ title, content }, userId) {
    const post = await BlogPost.create({
      title,
      content,
      userId,
    });

    const blogPost = {
      title: post.title,
      content: post.content,
      userId: post.userId,
    };

    return blogPost;
  },
};
