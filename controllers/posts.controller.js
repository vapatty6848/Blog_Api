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

module.exports = {
  create,
};
