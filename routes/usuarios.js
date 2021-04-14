const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const usuarioRoute = Router();

usuarioRoute.post('/',
middleware.validateUser,
controller.usuario.create
);

usuarioRoute.get('/',
middleware.validateToken,
controller.usuario.getAll
);

usuarioRoute.get('/:id',
middleware.validateToken,
controller.usuario.getById
);

usuarioRoute.delete('/me',
middleware.validateToken,
controller.usuario.remove
);

module.exports = usuarioRoute;