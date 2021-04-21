const { BlogPost } = require('../../models');

const deletePostController = async (req, res) => {
  const { id } = req.params;
  await BlogPost.destroy({ where: { id } });
  res.status(204).json();
};

module.exports = deletePostController;
