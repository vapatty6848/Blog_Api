const { Router } = require('express');
// const { BlogPost, User } = require('../models');

const postController = new Router();

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
