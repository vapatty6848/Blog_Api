const validatePostFields = (req, res, next) => {
  const { title, content } = req.body;
  if (!title || title.length === 0) return res.status(400).json({ message: '"title" is required' });

  if (!content || content.length === 0) return res.status(400).json({ message: '"content" is required' });

  next();
};

module.exports = validatePostFields;
