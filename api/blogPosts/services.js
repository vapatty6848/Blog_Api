const model = require('./model');

const create = async ({ body, user }) => {
  const userId = user.id;
  const { content, title } = body;

  const blogPost = await model.create({ title, content, userId });
  const { id } = blogPost;

  if (id) return ({ status: 201, payload: blogPost });

  return ({ status: 400, payload: { message: 'Erro interno' } });
};

const getAll = async () => {
  const blogPosts = await model.getAll();

  if (!blogPosts) {
    const message = 'Erro interno';
    return ({ status: 400, payload: { message } });
  }

  return ({ status: 200, payload: blogPosts });
};

const getOne = async ({ params }) => {
  const { id } = params;
  const blogPost = await model.findById(id);

  if (!blogPost) {
    const message = 'Post não existe';
    return ({ status: 404, payload: { message } });
  }

  return ({ status: 200, payload: blogPost });
};

const update = async ({ params, body, user }) => {
  const userId = user.id;

  const { id } = params;
  const blogPost = await model.findById(id);

  if (!blogPost) {
    const message = 'Post não existe';
    return ({ status: 404, payload: { message } });
  }

  if (blogPost.userId !== userId) {
    const message = 'Usuário não autorizado';
    return ({ status: 401, payload: { message } });
  }

  const { content, title } = body;
  blogPost.content = content;
  blogPost.title = title;
  await blogPost.save();

  return ({ status: 200, payload: blogPost });
};

const search = async ({ query }) => {
  const { q } = query;

  const blogPosts = await model.search(q);

  if (!blogPosts) {
    const message = 'erro interno';
    return ({ status: 400, payload: { message } });
  }

  return ({ status: 200, payload: blogPosts });
};

const remove = async ({ user, params }) => {
  const userId = user.id;

  const { id } = params;
  const blogPost = await model.findById(id);

  if (!blogPost) {
    const message = 'Post não existe';
    return ({ status: 404, payload: { message } });
  }

  if (blogPost.userId !== userId) {
    const message = 'Usuário não autorizado';
    return ({ status: 401, payload: { message } });
  }

  await blogPost.destroy();

  return ({ status: 204 });
};

module.exports = { create, getAll, getOne, remove, update, search };
