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

const updateOne = async (req, res, next) => {
  try {
    const { userId, body, params: { id } } = req;
    const newPost = await posts.update(id, body, userId);
    res.status(StatusCodes.OK).json(newPost);
  } catch (err) {
    return next({ err });
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { q } = req.query;
    const filterPosts = await posts.getPosts(q);
    res.status(StatusCodes.OK).json(filterPosts);
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

const removeOne = async (req, res, next) => {
  try {
    const { userId, params: { id } } = req;
    await posts.removeOne(id, userId);
    res.status(StatusCodes.NO_CONTENT).json();
  } catch (err) {
    return next({ err });
  }
};

module.exports = {
  create,
  updateOne,
  getPosts,
  getOne,
  removeOne,
};
