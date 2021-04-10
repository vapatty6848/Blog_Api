const { BlogPost } = require('../models');
const { User } = require('../models');
const { verifyToken } = require('../helpers/utils');

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const token = req.headers.authorization;
  const email = verifyToken(token);
  const user = await User.findOne({ where: { email } });
  const userId = user.dataValues.id;
  BlogPost.create({ title, content, userId })
    .then((post) => res.status(201).json(post))
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado' });
    });
};

module.exports = createPost;
