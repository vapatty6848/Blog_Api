const postsService = require('./postsService');

const createPost = async (req, res) => {
  try {
    console.log('CREATE POST CONTROLLER');

    const { title, content } = req.body;
    const { userId } = req;

    const newPost = await postsService.createPost(title, content, userId);

    return res.status(201).json(newPost);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getAllPosts = async (req, res) => {
  try {
    console.log('GET ALL POSTS CONTROLLER');

    const posts = await postsService.getAllPosts();

    return res.status(200).json(posts);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

const getById = async (req, res) => {
  try {
    console.log('GET BY ID CONTROLLER');

    const { id } = req.params;

    const { post, message } = await postsService.getById(id);

    if (message) return res.status(404).json({ message });

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
};
