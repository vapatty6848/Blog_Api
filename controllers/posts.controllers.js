const { StatusCodes } = require('http-status-codes');
const { posts } = require('../services');

const create = async (req, res, next) => {
  try {
    const { userId, body } = req;
    const newPost = await posts.create(body, userId);
    res.status(StatusCodes.CREATED).json(newPost);
  } catch (err) {
    return next({ err });
  }
};

const getAll = async (_req, res, next) => {
  try {
    const getPosts = await posts.getAll();
    res.status(StatusCodes.OK).json(getPosts);
  } catch (err) {
    return next({ err });
  }
};

const getOne = async (req, res, next) => {
  try {
    const { id } = req.params;
    const getPost = await posts.getOne(id);
    res.status(StatusCodes.OK).json(getPost);
  } catch (err) {
    return next({ err });
  }
};

module.exports = {
  create,
  getAll,
  getOne,
};
