const { status, messages } = require('../../libs/dicts');
const { ThrowError } = require('../errorHandler/utils');
const { BlogPosts } = require('../../../models');

const validatePostOwnership = async (req, res, next) => {
  const { user } = req.body;
  const { id } = req.params;

  try {
    const { userId } = await BlogPosts.findByPk(id);

    if (userId !== user.id) throw new ThrowError(status.unauthorized, messages.unauthorizedUser);

    next();
  } catch (error) {
    if (error.message === messages.unauthorizedUser) {
      next(error);
    } else {
      res.status(status.notFound).json({ message: messages.missingPost });
    }
  }
};

module.exports = validatePostOwnership;
