const { Router } = require('express');
const controller = require('../controllers');
const middleware = require('../middlewares');
const postRoute = Router();

postRoute.post( '/',
  middleware.validateToken,
  middleware.validatePost,
  controller.posts.create,
);

postRoute.get('/',
middleware.validateToken,
controller.posts.getAll
);

postRoute.get('/:id',
middleware.validateToken,
controller.posts.getById
);

postRoute.put('/:id',
  middleware.validateToken,
  middleware.validatePost,
  middleware.validateUserPost,
  controller.posts.update,
);

module.exports = postRoute;