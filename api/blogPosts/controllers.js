const express = require('express');
const services = require('./services');
const checkToken = require('../middlewares/checkToken');

const usersController = express();

const errorTypes = [
  {
    status: 400,
    message: '"title" is required',
  },
  {
    status: 400,
    message: '"title" is not allowed to be empty',
  },
  {
    status: 400,
    message: '"content" is required',
  },
  {
    status: 400,
    message: '"content" is not allowed to be empty',
  },
];

const bodyCheck = (req, res, next) => {
  const { title, content } = req.body;

  if (title === '') return res.status(errorTypes[1].status).json({ message: errorTypes[1].message });
  if (!title) return res.status(errorTypes[0].status).json({ message: errorTypes[0].message });
  if (content === '') return res.status(errorTypes[3].status).json({ message: errorTypes[3].message });
  if (!content) return res.status(errorTypes[2].status).json({ message: errorTypes[2].message });
  next();
};

const create = async (req, res) => {
  const response = await services.create(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const getAll = async (req, res) => {
  const response = await services.getAll();
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const getOne = async (req, res) => {
  const response = await services.getOne(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const update = async (req, res) => {
  const response = await services.update(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const search = async (req, res) => {
  const response = await services.search(req);
  const { status, payload } = response;
  return res.status(status).json(payload);
};

const remove = async (req, res) => {
  const response = await services.remove(req);
  const { status, payload = '' } = response;
  return res.status(status).json(payload);
};

usersController.post('/',
  checkToken,
  bodyCheck,
  create);

usersController.get('/search',
  checkToken,
  search);

usersController.get('/:id',
  checkToken,
  getOne);

usersController.get('/',
  checkToken,
  getAll);

usersController.delete('/:id',
  checkToken,
  remove);

usersController.put('/:id',
  checkToken,
  bodyCheck,
  update);

module.exports = usersController;
