const { User, BlogPost } = require('../models');
const validations = require('../helpers/validations');

const getPostById = async (req, res) => {
  const { id } = req.params;
  BlogPost.findByPk(id, { include:
    { model: User, as: 'user', attributes: { exclude: 'password' } } })
    .then((post) => {
      if (!post) {
        const err = validations.postDoesNotExistsError();
        return res.status(err.status).json(err);
      }
      return res.status(200).json(post);
    })
    .catch((e) => {
      console.error(e);
    });
};

module.exports = getPostById;
