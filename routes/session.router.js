const { Router } = require('express');

const { Session } = require('../controllers');

const session = Router();

session.post('/login', Session.login);

module.exports = session;
