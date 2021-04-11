const postsService = require('./postsService');

const createPost = async (req, res) => {
  console.log('CREATE POST CONTROLLER');

  const { title, content } = req.body;
  const { userId } = req;

  const newPost = await postsService.createPost(title, content, userId);

  res.status(201).json(newPost);
};

module.exports = {
  createPost,
};
