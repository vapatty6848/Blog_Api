const createPost = async (req, res) => {
  res.status(200).json({ message: 'createPost' });
};

const searchPost = async (req, res) => {
  res.status(200).json({ message: 'searchPost' });
};

const getPostById = async (req, res) => {
  res.status(200).json({ message: 'getPostById' });
};

const getAllPosts = async (req, res) => {
  res.status(200).json({ message: 'getAllPosts' });
};

const updatePost = async (req, res) => {
  res.status(200).json({ message: 'updatePost' });
};

module.exports = {
  createPost,
  searchPost,
  getPostById,
  getAllPosts,
  updatePost,
};
