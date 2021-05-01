const { Op } = require('sequelize');
const { BlogPost } = require('../models');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.user.data.id;
  try {
    const post = await BlogPost.create({
      title, content, userId,
    });
    return res.status(201).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const getAll = async (req, res) => {
  try {
    const posts = await BlogPost.findAll({
      include: 'user',
    });
    if (posts === null) {
      return res.status(404).json({ message: 'Nada a retornar' });
    }
    return res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado!' });
  }
};

const getPostByID = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await BlogPost.findOne({
      where: { id },
      include: 'user',
    });
    if (post === null) {
      return res.status(404).json({ message: 'Post não existe' });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const update = async (req, res) => {
  const userID = req.user.data.id;
  const { title, content } = req.body;
  const { id } = req.params;
  try {
    const post = await BlogPost.findOne({
      where: { id },
    });
    if (post.userId !== userID) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }

    await BlogPost.update({ title, content }, {
      where: { id },
    });

    return res.status(200).json({ title, content, userId: userID });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const searchPost = async (req, res) => {
  const searhTerm = `%${req.query.q}%`;
  try {
    const search = await BlogPost.findAll({
      where: {
        [Op.or]: [
          { title: {
            [Op.like]: searhTerm,
          },
          },
          { content: {
            [Op.like]: searhTerm,
          },
          },
        ],
      },
      include: 'user',
    });
    return res.status(200).json(search);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const deletePost = async (req, res) => {
  const userID = req.user.data.id;
  const { id } = req.params;
  try {
    const post = await BlogPost.findOne({
      where: { id },
    });
    if (post === null) {
      res.status(404).json({ message: 'Post não existe' });
    }
    if (post.userId !== userID) {
      return res.status(401).json({ message: 'Usuário não autorizado' });
    }
    await BlogPost.destroy({
      where: { id },
    });
    return res.status(204).end();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createPost,
  getAll,
  getPostByID,
  update,
  searchPost,
  deletePost,
};
