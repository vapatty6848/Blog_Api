const { Router } = require('express');
const { PostServices, ValidationDataServices } = require('../services');

const { validations: valid } = require('../middlewares');

const route = Router();

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
    return res.status(201).json({ userId, content, title });
  } catch {
    return res.status(500).json({ message: 'Erro Interno' });
  }
});

route.get('/', valid.verifyAuthorization, async (req, res) => {
  const listAllPosts = await PostServices.findAllPosts();
  return res.status(200).json(listAllPosts);
});

route.get('/:id', valid.verifyAuthorization, async (req, res) => {
  const { id } = req.params;
  try {
    const post = await PostServices.findPostById(id);
    return res.status(200).json(post);
  } catch {
    return res.status(404).json({ message: 'Post não existe' });
  }
});

route.put('/:id', valid.verifyAuthorization, valid.verifyBodyPost, async (req, res) => {
  const { id } = req.params;
  const bodyData = req.body;
  const { authorization: token } = req.headers;
  try {
    const { id: idUser } = await ValidationDataServices.tokenValid(token);
    const { user: { id: userId } } = await PostServices.findPostById(id);
    console.log(idUser, '', userId);
    if (userId !== idUser) return res.status(401).json({ message: 'Usuário não autorizado' });
    await PostServices.updatePost(bodyData, id);
    return res.status(200).json({ ...bodyData, userId });
  } catch {
    return res.status(401).json({ message: 'Post não existe' });
  }
});

module.exports = route;
