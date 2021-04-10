const verifications = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(401).json({ message: 'Token expirado ou inválido' });
  if (token === '') return res.status(401).json({ message: 'Token não exncontrado' });
  next();
};

module.exports = verifications;
