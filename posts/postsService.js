const { BlogPosts, Users } = require('../models');

const createPost = async (title, content, userId) => {
  console.log('CREATE POST SERVICE');

  await BlogPosts.create({ title, content, userId });

  return { title, content, userId };
};

const getAllPosts = async () => {
  console.log('GET ALL POSTS SERVICE');

  const posts = await BlogPosts.findAll({
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  });

  return posts;
};

/* PR do Luciano me salvando na parte de mostrar apenas os campos desejados
com o exclude no attributes, tentei encontrar na documentação algo do tipo
mas não tinha achado nada parecido */

const getById = async (id) => {
  console.log('GET BY ID SERVICE');

  const post = await BlogPosts.findByPk(id, {
    attributes: { exclude: ['userId'] },
    include: { model: Users, as: 'user', attributes: { exclude: ['password'] } },
  });

  if (!post) {
    return { message: 'Post não existe' };
  }

  return { post };
};

const updatePost = async (id, userId, title, content) => {
  console.log('UPDATE POST SERVICE');
  const postById = await BlogPosts.findByPk(id);

  if (postById.userId !== userId) {
    return { message: 'Usuário não autorizado' };
  }

  await BlogPosts.update(
    { title, content },
    { where: { id } },
  );

  const updatedPost = { title, content, userId };

  return { updatedPost };
};

const searchPosts = async (searchTerm) => {
  console.log('SEARCH POST SERVICE');
  const posts = await getAllPosts();

  const foundPosts = posts.filter(
    (post) => post.title.includes(searchTerm) || post.content.includes(searchTerm),
  );

  return foundPosts;
};

const removePost = async (id, userId) => {
  console.log('DELETE POST SERVICE');

  const { post } = await getById(id);

  if (!post) {
    return { notFound: 404, message: 'Post não existe' };
  }

  if (post.user.id !== userId) {
    return { message: 'Usuário não autorizado' };
  }

  console.log('DETALHES', post.user.id);

  await BlogPosts.destroy({ where: { id } });

  return { status: 204 };
};

module.exports = {
  createPost,
  getAllPosts,
  getById,
  updatePost,
  searchPosts,
  removePost,
};
