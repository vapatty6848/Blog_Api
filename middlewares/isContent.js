const isContent = async (req, res, next) => {
  const { content } = req.body;
  if(!content) return res.status(400).json({message: '\"content\" is required'});

  next();
};

module.exports = isContent;
