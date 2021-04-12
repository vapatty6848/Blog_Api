const BlogPostsServices = require('../services/BlogPostsServices');
const { SUCESS, CREATED, INTERNAL_SERVER_ERROR, NOT_FOUND, NO_CONTENT } = require('./httpStatus');

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

    return res.status(SUCESS).json(posts);
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const getPostById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const [post] = await BlogPostsServices.getPostById(id);

    if (!post) {
      return next({
        statusCode: NOT_FOUND,
        customMessage: 'postNotFound',
      });
    }

    return res.status(SUCESS).json(post);
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const updatePost = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;

  try {
    await BlogPostsServices.updatePost(id, title, content);
    const [post] = await BlogPostsServices.getPostById(id);
    const { dataValues } = post;

    return res.status(SUCESS).json({
      title: dataValues.title,
      content: dataValues.content,
      userId: dataValues.user.dataValues.id,
    });
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await BlogPostsServices.deletePost(id);

    return res.status(NO_CONTENT).send();
  } catch (e) {
    console.log(e.message);
    res.status(INTERNAL_SERVER_ERROR).send({ message: 'Algo deu errado' });
  }
};

module.exports = {
  createPost,
  getPosts,
  getPostById,
  updatePost,
  deletePost,
};
