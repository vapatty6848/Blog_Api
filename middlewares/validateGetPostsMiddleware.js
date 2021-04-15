const decodeToken = require('../utils/decodeToken');

const { haveTokenField } = require('../utils/validations');

const { User, BlogPost } = require('../models');

const validateCreateUser = async (req, res, _next) => {
  try {
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    await decodeToken(req.headers.authorization);

    const findUserByBlogPost = await BlogPost.findAll({ include: { model: User, as: 'user' } });
    return res.status(200).json(findUserByBlogPost);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateCreateUser;
