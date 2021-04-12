const { postSchema } = require('../schemas');
const { verifyToken } = require('../security');
const { BlogPost } = require('../models');

const validatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    const { error } = postSchema.validate({ title, content });
    if (error) return res.status(400).json({ message: error.details[0].message });
    next();
  } catch (err) {
    next(err);
  }
};

const validateUserPost = async (req, res, next) => {
  try {
    const { authorization: token } = req.headers;
    const { id } = req.params;
    const { sub } = verifyToken(token);
    const { dataValues: { userId } } = await BlogPost.findOne({ where: { id } });
    if (userId !== sub) return res.status(401).json({ message: 'Usuário não autorizado' });
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  validatePost,
  validateUserPost,
};
