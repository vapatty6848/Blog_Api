const { StatusCodes } = require('http-status-codes');
const { posts } = require('../services');

module.exports = async (req, res, next) => {
  try {
    const { userId, body } = req;
    const newPost = await posts.create(body, userId);
    res.status(StatusCodes.CREATED).json(newPost);
  } catch (err) {
    return next({ err });
  }
};
