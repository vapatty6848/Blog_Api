const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const groupRoute = Router();

groupRoute.post('/',
middleware.validateGroup,
controller.group
);

module.exports = groupRoute;