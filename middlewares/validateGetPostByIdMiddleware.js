const decodeToken = require('../utils/decodeToken');

const { BlogPost, User } = require('../models');
const { haveTokenField } = require('../utils/validations');

const validateGetPostByIdMiddleware = async (req, res, _next) => {
  try {
    if (!haveTokenField(req.headers)) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    await decodeToken(req.headers.authorization);

    const { id } = req.params;

    const foundPost = await BlogPost.findOne({
      include: { model: User, as: 'user', attributes: { exclude: 'password' } },
      where: { id: parseInt(id, 10) },
    });

    if (foundPost === null) {
      return res.status(404).json({ message: 'Post não existe' });
    }

    return res.status(200).json(foundPost);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateGetPostByIdMiddleware;
