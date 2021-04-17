const {
  isTheUserWhoCreatedThePost,
  postExist } = require('../utils/validations');

const { BlogPost } = require('../models');

const validateDeletePost = async (req, res, _next) => {
  try {
    const { id } = req.params;
    const postExists = await postExist(parseInt(id, 10));
    if (!postExists) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    if (Object.keys(req.headers.authorization).length === 0) {
      return res.status(401).json({ message: 'Token não encontrado' });
    }
    const validUser = await isTheUserWhoCreatedThePost(parseInt(req.params.id, 10),
      req.headers.authorization);
    if (!validUser) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await BlogPost.destroy({ where: { id: parseInt(id, 10) } });
    return res.status(204).json({ message: 'Usuário deletado' });
  } catch (error) {
    return res.status(401).json({ message: 'Token expirado ou inválido' });
  }
};

module.exports = validateDeletePost;
