const { Router } = require('express');
const { PostServices, ValidationDataServices } = require('../services');

const { validations: valid } = require('../middlewares');

const route = Router();

route.post('/', valid.verifyAuthorization, valid.verifyBodyPost, async (req, res) => {
  const { authorization: token } = req.headers;
  const { id } = await ValidationDataServices.tokenValid(token);
  const bodyData = {
    ...req.body,
    published: new Date(),
    updated: new Date(),
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

module.exports = route;
