const postsService = require('./postsService');

const createPost = async (req, res) => {
  console.log('CREATE POST CONTROLLER');

  const { title, content } = req.body;
  const { userId } = req;

  const newPost = await postsService.createPost(title, content, userId);

  res.status(201).json(newPost);
};

const getAllPosts = async (req, res) => {
  console.log('GET ALL POSTS CONTROLLER');

  const posts = await postsService.getAllPosts();

  res.status(200).json(posts);
};

const getById = async (req, res) => {
  console.log('GET BY ID CONTROLLER');

  const { id } = req.params;

  const { post, message } = await postsService.getById(id);

  if (message) return res.status(404).json({ message });

  res.status(200).json(post);
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
};
