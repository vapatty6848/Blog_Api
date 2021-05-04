const { Router } = require('express');

const { Session } = require('../controller');

const session = Router();

session.post('/login', Session.login);

module.exports = session;
