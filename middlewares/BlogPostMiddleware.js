const BlogPostsServices = require('../services/BlogPostsServices');
const { CREATED, INTERNAL_SERVER_ERROR } = require('./httpStatus');

const createPost = async (req, res) => {
  const { title, content } = req.body;

  try {
    const post = await BlogPostsServices.createPost(title, content, req.userId);
    const { dataValues } = post;

    res.status(CREATED).json({
      title: dataValues.title,
      content: dataValues.content,
      userId: dataValues.userId,
    });
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const getPosts = async (req, res) => {
  try {
    const posts = await BlogPostsServices.getPosts();

    return res.status(200).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createPost,
  getPosts,
};
