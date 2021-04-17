const jwt = require('jsonwebtoken');
const { BlogPosts } = require('../models');

const secret = 'cabeça';

const errNotHave = 400;
const errToken = 401;

const createPost = async (req, res, next) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;

  if (!title) {
    return res.status(errNotHave).json({ message: '"title" is required' });
  }
  if (!content) {
    return res.status(errNotHave).json({ message: '"content" is required' });
  }
  if (!token) {
    return res.status(errToken).json({ message: 'Token não encontrado' });
  }
  try {
    jwt.verify(token, secret);
    next();
  } catch (error) {
    if (error) {
      return res.status(errToken).json({ message: 'Token expirado ou inválido' });
    }
  }
};

module.exports = {
  createPost,
};
