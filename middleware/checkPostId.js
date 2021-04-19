const { BlogPosts, Users } = require('../models');

const checkPostId = async (req, res, next) => {
  const { id } = req.params;
  const { email } = req.payload;
  const userid = await BlogPosts.findAll({
    where: {
      id,
    },
  });
  const [{ dataValues }] = await Users.findAll({ where: { email } });
  const checkUI = await BlogPosts.findAll({ where: { userId: dataValues.id } });
  if (userid.length === 0) return res.status(404).json({ message: 'Post não existe' });
  if (checkUI.length === 0) return res.status(401).json({ message: 'Usuário não autorizado' });
  next();
};

module.exports = checkPostId;
