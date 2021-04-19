// const jwt = require('jsonwebtoken');
const { Post } = require('../../models');
// const { secret } = require('../services/JwtToken');

const deletePostController = async (req, res) => {
  const { id } = req.params;
  // const payload = jwt.verify(authorization, secret);
  // console.log(payload);
  await Post.destroy({ where: { id } });
  res.status(204).json();
};

module.exports = deletePostController;
