const { User, BlogPost } = require('../models');

const getAllPosts = (_req, res) => {
  BlogPost.findAll({ include:
    { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => res.status(200).json(post))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = getAllPosts;
