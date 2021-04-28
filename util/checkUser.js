const { BlogPost } = require('../models');

const checkUser = async (id) => {
  const user = await BlogPost.findAll({ where: { id } });
  if (!user.length) return null;
  return user[0].userId;
};

module.exports = checkUser;
