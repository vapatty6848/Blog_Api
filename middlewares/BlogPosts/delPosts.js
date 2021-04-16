// const delPost = await deletePost(id);
// if (!delPost) return res.status(401).json({ message: 'Usuário não autorizado' });
const delPosts = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Usuário não autorizado' });
  next();
};

module.exports = delPosts;
