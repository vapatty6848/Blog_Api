const { StatusCodes } = require('http-status-codes');
const { posts } = require('../services');

const create = async (req, res, next) => {
  try {
    const { userId, body: { title, content } } = req;
    const data = await posts.createPost(title, content, userId);
    return res.status(StatusCodes.CREATED).json(data);
  } catch (err) {
    return next(err);
  }
};

const getAll = async (_req, res, next) => {
  try {
    const data = await posts.getAll();
    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    return next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await posts.getById(id);
    return res.status(StatusCodes.OK).json(data);
  } catch (err) {
    return next(err);
  }
};

const edit = async (req, res, next) => {
  try {
    const { userId, body: { title, content }, params: { id } } = req;
    const data = await posts.edit(title, content, id, userId);
    return res.status(200).json(data);
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  create,
  getAll,
  getById,
  edit,
};
