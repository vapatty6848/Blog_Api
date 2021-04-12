const getByIdPosts = async (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(404).json({ message: 'Post não existe' });
  next();
};

module.exports = getByIdPosts;
