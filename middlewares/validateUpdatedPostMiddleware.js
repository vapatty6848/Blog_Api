const decodeToken = require('../utils/decodeToken');

const {
  haveTitleField,
  haveContentField } = require('../utils/validations');

const { User, BlogPost } = require('../models');

const isTheUserWhoCreatedThePost = async (id, token) => {
  const foundPost = await BlogPost.findByPk(id, { raw: true, include: { model: User, as: 'user' } });

  const decodedToken = await decodeToken(token);

  if (foundPost['user.email'] === decodedToken.email) {
    return true;
  }
  return false;
};

const validateUpdatedPost = async (req, res, _next) => {
  try {
    if (Object.keys(req.headers.authorization).length === 0) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const validUser = await isTheUserWhoCreatedThePost(parseInt(req.params.id, 10),
      req.headers.authorization);
    if (!validUser) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    if (!haveTitleField(req.body)) {
      return res.status(400).json({ message: '"title" is required' });
    }
    if (!haveContentField(req.body)) {
      return res.status(400).json({ message: '"content" is required' });
    }
    await decodeToken(req.headers.authorization);
    const { id } = req.params;
    const { title, content } = req.body;
    await BlogPost.update({ title, content }, { where: { id } });
    return res.status(200).json({ title, content, userId: parseInt(id, 10) });
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateUpdatedPost;
