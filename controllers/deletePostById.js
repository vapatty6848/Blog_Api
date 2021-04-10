const { BlogPost } = require('../models');

const deletePostById = async (req, res) => {
  const { id } = req.params;
  BlogPost.destroy({ where: { id } }).then(() => res.status(204).json())
    .catch((e) => {
      console.error(e);
    });
};

module.exports = deletePostById;
