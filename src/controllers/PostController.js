const CreatePostService = require('../services/blogPost/CreatePostService');
const GetAllPostService = require('../services/blogPost/GetAllPostService');
const GetPostByIdService = require('../services/blogPost/GetPostByIdService');

const { NOT_FOUND } = require('../errors/status');

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

  async getPostById(req, res) {
    const post = await GetPostByIdService.execute(req.params);

    if (!post) return res.status(NOT_FOUND).json({ message: 'Post não existe' });

    return res.status(OK).json(post[0]);
  },
};
