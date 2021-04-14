const verifications = (req, res, next) => {
  const { content, title } = req.body;
  const token = req.headers.authorization;
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  if (!token) return res.status(401).json({ message: 'Token não encontrado' });
  next();
};

module.exports = verifications;
