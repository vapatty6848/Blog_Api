const { Router } = require('express');
const { PostServices, ValidationDataServices } = require('../services');

const { validations: valid } = require('../middlewares');

const route = Router();
const ok = 200;
const created = 201;
const unauthorized = 401;
const notFound = 404;
const noContent = 204;

route.post('/', valid.verifyAuthorization, valid.verifyBodyPost, async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = await ValidationDataServices.tokenValid(token);
  const bodyData = {
    published: new Date(),
    updated: new Date(),
    ...req.body,
    userId: id,
  };
  try {
    const createPost = await PostServices.createPost(bodyData);
    const { userId, content, title } = createPost;
    return res.status(created).json({ userId, content, title });
  } catch {
    return res.status(notFound).json({ message: 'Erro Interno' });
  }
});

route.get('/', valid.verifyAuthorization, async (req, res) => {
  const listAllPosts = await PostServices.findAllPosts();
  return res.status(ok).json(listAllPosts);
});

route.get('/search', valid.verifyAuthorization, async (req, res) => {
  const therm = req.query.q;
  const listPost = await PostServices.findPostsByTherm(therm);
  return res.status(ok).json(listPost);
});

route.get('/:id', valid.verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostServices.findPostById(id);
    return res.status(ok).json(post);
  } catch {
    return res.status(notFound).json({ message: 'Post não existe' });
  }
});

route.put('/:id', valid.verifyAuthorization, valid.verifyBodyPost, async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  const { authorization: token } = req.headers;
  try {
    const { id: idUser } = await ValidationDataServices.tokenValid(token);
    const { user: { id: userId } } = await PostServices.findPostById(id);
    const message = 'Usuário não autorizado';
    if (userId !== idUser) return res.status(unauthorized).json({ message });
    const [updatePost] = await PostServices.updatePost(bodyData, id);
    if (updatePost !== 0) return res.status(ok).json({ ...bodyData, userId });
  } catch {
    return res.status(unauthorized).json({ message: 'Post não existe' });
  }
});

route.delete('/:id', valid.verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  const { authorization: token } = req.headers;
  try {
    const { id: idUser } = await ValidationDataServices.tokenValid(token);
    const { user: { id: userId } } = await PostServices.findPostById(id);

    const message = 'Usuário não autorizado';
    if (userId !== idUser) return res.status(unauthorized).json({ message });

    const deleteUser = await PostServices.deletePost(id);
    if (deleteUser !== 0) return res.status(noContent).send();
  } catch {
    return res.status(notFound).json({ message: 'Post não existe' });
  }
});

module.exports = route;
