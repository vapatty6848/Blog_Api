const services = require('../services/postsServices');

const createPosts = async (req, res, next) => {
  try {
    const {
      body: { title, content },
      user: { userId },
    } = req;

    const {
      dataValues: { id, published, updated, ...postCreated },
    } = await services.createPosts(title, content, userId);

    return res.status(201).json(postCreated);
  } catch (err) {
    return next(err);
  }
};

const findAllPosts = async (req, res, next) => {
  try {
    const allPosts = await services.findAllPosts();

    return res.status(200).json(allPosts);
  } catch (err) {
    return next(err);
  }
};

const findById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postById = await services.findById(id);

    return res.status(200).json(postById);
  } catch (err) {
    return next(err);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const {
      params: { id },
      user: { email },
    } = req;

    await services.deletePost(id, email);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  createPosts,
  findAllPosts,
  findById,
  deletePost,
};
