const jwt = require('jsonwebtoken');
const { BlogPosts, Users } = require('../models');

const secret = 'secret';

const titleExists = (req, res, next) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: '"title" is required' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const contentExists = (req, res, next) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({ message: '"content" is required' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const blogpostExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const idDb = await BlogPosts.findByPk(id);
    if (!idDb) {
      return res.status(404).json({ message: 'Post não existe' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

const sameUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const postdb = await BlogPosts.findByPk(id);
    const { authorization } = req.headers;
    const verifyToken = jwt.verify(authorization, secret);
    const { email } = verifyToken;
    const user = await Users.findOne({ where: { email } });
    if (postdb.dataValues.UserId !== user.dataValues.id) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
  } catch (err) {
    console.log(err);
  }
  next();
};

module.exports = {
  titleExists,
  contentExists,
  blogpostExists,
  sameUser,
};
