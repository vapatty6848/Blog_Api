const { BlogPost } = require('../../models');
// const validateToken = require('../Auth/validateToken');

const validatePost = async (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title) throw new Error('"title" is required');
    if (!content) throw new Error('"title" is required');
    next();
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
};

const validatePostOwner = async (req, res, next) => {
  try {
    const user = req.payload.id;
    const getPost = await BlogPost.findByPk(req.params.id);
    if (!getPost) throw new Error('Post não existe');
    if (getPost.userId !== user.id) throw new Error('Usuário não autorizado');
    next();
  } catch (err) {
    console.log(err);
    res.status(err.message === 'Post não existe' ? 404 : 401)
      .send({ message: err.message.code ? err.message.er : err.message });
  }
};

module.exports = { validatePost, validatePostOwner };
