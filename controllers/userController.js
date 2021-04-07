const { Router } = require('express');
const { registerUserService } = require('../services/userService');
// const { User, BlogPost } = require('../models');

const userController = new Router();

// userController.get('/', (req, res) => {
//   User.findAll({ include: { model: BlogPost, as: 'blogPost' } })
//     .then((data) => {
//       res.status(200).json(data);
//     })
//     .catch(() => {
//       res.status(500).json({ message: 'erro interno' });
//     });
// });

userController.post('/', registerUserService);
// userController.get('/:id', getAdminOrder);
// userController.put('/:id', updateAdminOrderStatus);

module.exports = userController;
