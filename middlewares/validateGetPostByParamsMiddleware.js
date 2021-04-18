const decodeToken = require('../utils/decodeToken');

const {
  isEmptyParams,
  findPostByParam } = require('../utils/validations');

const { User, BlogPost } = require('../models');

const validateGetPostByParams = async (req, res, _next) => {
  try {
    if (Object.keys(req.headers.authorization).length === 0) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }

    await decodeToken(req.headers.authorization);
    const { q: query } = req.query;

    if (isEmptyParams(req.params.q)) {
      const foundPost = await BlogPost.findAll({ include: { model: User, as: 'user' } });
      return res.status(200).json(foundPost);
    }

    const foundPost = await findPostByParam(query);

    if (foundPost.length <= 0) {
      return res.json([]);
    }

    return res.status(200).json(foundPost);
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateGetPostByParams;
