const express = require('express');

const controllers = require('../controllers');
// const middlewares = require('../middlewares');

const session = express.Router();

session.post('/', controllers.session);

module.exports = session;
