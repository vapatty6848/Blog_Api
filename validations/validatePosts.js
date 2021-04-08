const validatePosts = async (request, response, next) => {
  const { title, content } = request.body;
  if (!title) return response.status(400).json({ message: '"title" is required' });
  if (!content) return response.status(400).json({ message: '"content" is required' });
  next();
};

module.exports = { validatePosts };
