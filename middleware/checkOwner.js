const { BlogPosts, Users } = require('../models');

const Check = async (req, res, next) => {
  const { email } = req.payload;
  const { title, content } = req.body;
  const [{ dataValues }] = await Users.findAll({ where: { email } });
  const checkUI = await BlogPosts.findAll({ where: { userId: dataValues.id } });
  if (checkUI.length === 0) return res.status(401).json({ message: 'Usuário não autorizado' });
  if (!title) return res.status(400).json({ message: '"title" is required' });
  if (!content) return res.status(400).json({ message: '"content" is required' });
  next();
};

module.exports = Check;
