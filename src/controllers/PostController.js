const CreatePostService = require('../services/blogPost/CreatePostService');
const GetAllPostService = require('../services/blogPost/GetAllPostService');

const OK = 200;
const CREATED = 201;

module.exports = {
  async createPost(req, res) {
    const post = await CreatePostService.execute(req.body, req.userId);

    return res.status(CREATED).json(post);
  },

  async getAllPosts(_req, res) {
    const posts = await GetAllPostService.execute();

    return res.status(OK).json(posts);
  },
};
