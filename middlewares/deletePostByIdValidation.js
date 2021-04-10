const { verifyToken } = require('../helpers/utils');
const validations = require('../helpers/validations');
const { User, BlogPost } = require('../models');

const deletePostByIdValidation = async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization;
  const blogPost = await BlogPost.findByPk(id);
  const email = verifyToken(token);
  const user = await User.findOne({ where: { email } });
  if (!blogPost) {
    const err = validations.postDoesNotExistsError();
    return res.status(err.status).json(err);
  }
  if (user.dataValues.id !== blogPost.dataValues.userId) {
    const err = validations.userError();
    return res.status(err.status).json(err);
  }
  return next();
};

module.exports = deletePostByIdValidation;
