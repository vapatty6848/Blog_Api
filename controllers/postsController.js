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
      user: { userId },
    } = req;

    await services.deletePost(id, userId);

    return res.status(204).end();
  } catch (err) {
    return next(err);
  }
};

const editPost = async (req, res, next) => {
  try {
    const {
      body: { title, content },
      params: { id },
      user: { userId },
    } = req;

    const editById = await services.editPost(title, content, id, userId);

    return res.status(200).json(editById);
  } catch (err) {
    return next(err);
  }
};

const search = async (req, res, next) => {
  try {
    const { q: query } = req.query;
    const data = await services.search(query);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createPosts,
  findAllPosts,
  findById,
  deletePost,
  editPost,
  search,
};
