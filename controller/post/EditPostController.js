const { BlogPost } = require('../../models');

const editPostController = async (req, res) => {
  const { title, content } = req.body;
  const userId = req.payload.id;
  console.log(userId);
  const { id } = req.params;
  await BlogPost.update({ title, content }, { where: { id } });
  res.status(200).json({ title, content, userId });
};

module.exports = editPostController;
