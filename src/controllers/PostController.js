const CreatePostService = require('../services/blogPost/CreatePostService');

const CREATED = 201;

module.exports = {
  async createPost(req, res) {
    const post = await CreatePostService.execute(req.body, req.userId);

    return res.status(CREATED).json(post);
  },
};
