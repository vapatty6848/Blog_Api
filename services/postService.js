const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { BlogPost, User } = require('../models');

const {
  BAD_REQUEST,
  CREATED,
  INTERNAL_SERVER_ERROR,
  // CONFLICT,
  NOT_FOUND,
  NO_CONTENT,
  UNAUTHORIZED,
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
  const userId = payload.id;

  const dataBlogPostUserId = { ...dataBlogPost, userId };

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
  BlogPost.findAll({
    where: { id },
    include: { model: User, as: 'user' },
  })
    .then(([data]) => {
      if (!data) return res.status(NOT_FOUND).json(objErrRes('Post não existe'));
      res.status(OK).json(data);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const UpdateBlogPostByIdService = (req, res) => {
  const { id } = req.params;
  const dataUpdateBlogPost = req.body;

  const resError = (error) => res.status(error.status).json(objErrRes(error.err));

  const error = registerValidationDataBlogPost(dataUpdateBlogPost);
  if (error) return resError(error);

  const { authorization: token } = req.headers;
  const payload = jwt.decode(token);
  const userId = payload.id;

  BlogPost.update(
    dataUpdateBlogPost,
    { where: { id, userId } },
  )
    .then(([data]) => {
      if (!data) return res.status(UNAUTHORIZED).json(objErrRes('Usuário não autorizado'));
      res.status(OK).json({ ...dataUpdateBlogPost, userId });
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const FindBlogPostByTextService = (req, res) => {
  const { q: text } = req.query;

  const where = !text
    ? {}
    : {
      [Op.or]: [
        { title: { [Op.like]: `%${text}%` } },
        { content: { [Op.like]: `%${text}%` } },
      ],
    };

  BlogPost.findAll({
    where,
    include: { model: User, as: 'user' },
  })
    .then((data) => {
      res.status(OK).json(data);
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

const DeleteBlogPostByIdService = async (req, res) => {
  const { id } = req.params;

  const project = await BlogPost.findByPk(id);
  // console.log('project', project)
  if (!project) return res.status(NOT_FOUND).json(objErrRes('Post não existe'));

  const { authorization: token } = req.headers;
  const payload = jwt.decode(token);
  const userId = payload.id;

  BlogPost.destroy(
    { where: { id, userId } },
  )
    .then((qntDeleted) => {
      if (!qntDeleted) return res.status(UNAUTHORIZED).json(objErrRes('Usuário não autorizado'));
      res.status(NO_CONTENT).end();
    })
    .catch(() => {
      res.status(INTERNAL_SERVER_ERROR).json(objErrRes('erro interno'));
    });
};

module.exports = {
  RegisterBlogPostService,
  GetAllBlogPostService,
  GetBlogPostByIdService,
  UpdateBlogPostByIdService,
  FindBlogPostByTextService,
  DeleteBlogPostByIdService,
};
