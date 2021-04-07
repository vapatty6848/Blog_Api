const { Router } = require('express');
const VerifyAuthorization = require('../middlewares/VerifyAuthorization');
const { RegisterBlogPostService } = require('../services/postService');
// const { BlogPost, User } = require('../models');

const postController = new Router();

postController.use(VerifyAuthorization);

postController.post('/', RegisterBlogPostService);

// postController.get('/', (req, res) => {
//   BlogPost.findAll({ include: { model: User, as: 'user' } })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'erro interno' });
//     });
// });
// postController.get('/:id', getAdminOrder);
// postController.put('/:id', updateAdminOrderStatus);

module.exports = postController;
