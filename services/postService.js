const jwt = require('jsonwebtoken');

const { BlogPost, User } = require('../models');

const {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  // CONFLICT,
  NOT_FOUND,
  // NO_CONTENT,
  OK,
} = require('../utils/allStatusCode');
const {
  objErrValidation,
  objErrRes,
} = require('../utils/funcsStandardizeObj');

const registerValidationDataBlogPost = (dataBlogPost) => {
  const { title, content } = dataBlogPost;

  switch (false) {
    case !!title:
      return objErrValidation('"title" is required', BAD_REQUEST);
    case !!content:
      return objErrValidation('"content" is required', BAD_REQUEST);
    default: return null;
  }
};

const RegisterBlogPostService = (req, res) => {
  const dataBlogPost = req.body;

  const resError = (error) => res.status(error.status).json(objErrRes(error.err));

  const error = registerValidationDataBlogPost(dataBlogPost);
  if (error) return resError(error);

  const { authorization: token } = req.headers;
  const payload = jwt.decode(token);
  const { id } = payload;

  const dataBlogPostUserId = { ...dataBlogPost, userId: id };

  BlogPost.create(dataBlogPostUserId)
    .then(() => {
      res.status(CREATED).json(dataBlogPostUserId);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const GetAllBlogPostService = (_req, res) => {
  BlogPost.findAll({ include: { model: User, as: 'user' } })
    .then((data) => {
      res.status(OK).json(data);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const GetBlogPostByIdService = (req, res) => {
  const { id } = req.params;
  console.log('chegou')
  BlogPost.findAll({
    where: { id },
    include: { model: User, as: 'user' },
  })
    .then(([data]) => {
      console.log('data post', data)
      if (!data) return res.status(NOT_FOUND).json(objErrRes('Post não existe'));
      res.status(OK).json(data);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

module.exports = {
  RegisterBlogPostService,
  GetAllBlogPostService,
  GetBlogPostByIdService,
};
