const registerPost = (req, res, next) => {
  const { title, content } = req.body;

  if (!title) return res.status(400).json({ message: '"title" is required' });

  if (!content) return res.status(400).json({ message: '"content" is required' });

  next();
};

const verifyToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) return res.status(401).json({ message: 'Token não encontrado' });

  if (authorization.length < 16) return res.status(401).json({ message: 'Token expirado ou inválido' });

  next();
};

module.exports = { registerPost, verifyToken };
