const { Router } = require('express');

const SessionController = require('../controllers/SessionController');
const validateSessionData = require('../middlewares/validateSessionData');

const sessionController = new SessionController();

const sessionRoutes = Router();

sessionRoutes.post('/', validateSessionData, sessionController.create);

module.exports = sessionRoutes;
