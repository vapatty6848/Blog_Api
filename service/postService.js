// const { BlogPost, User } = require('../models');
// const Validations = require('./validations');

// const updatePostById = async ({ token, postId, title, content }) => {
//   const action = 'UPDATE';
//   const tokenValidation = await Validations.validateToken(token);
//   const titleValidation = Validations.validateTitle(title);
//   const contentValidation = Validations.validateContent(content);

//   if (tokenValidation.payload) return tokenValidation;
//   if (titleValidation.payload) return titleValidation;
//   if (contentValidation.payload) return contentValidation;

//   const userId = tokenValidation;

//   console.log('vai entrar aqui !');
//   const authorValidation = await Validations.validatePostAuthor({ postId, userId });

//   if (authorValidation.payload) return authorValidation;

//   const updatePost = await Validations.validatePost({ postId, action, title, content });

//   if (updatePost.payload) return updatePost;

//   const result = { title, content, userId };
//   return result;
// };

// const deletePostById = async ({ token, postId }) => {
//   const action = 'DELETE';
//   const tokenValidation = await Validations.validateToken(token);

//   if (tokenValidation.payload) return tokenValidation;

//   const userId = tokenValidation;

//   const authorValidation = await Validations.validatePostAuthor({ postId, userId });

//   if (authorValidation.payload) return authorValidation;

//   const result = await Validations.validatePost({ postId, action });

//   return result;
// };

// const getPostById = async ({ token, postId }) => {
//   const action = 'FIND';
//   const tokenValidation = await Validations.validateToken(token);

//   if (tokenValidation.payload) return tokenValidation;

//   const result = await Validations.validatePost({ postId, action });

//   return result;
// };

// const getAllPosts = async ({ token }) => {
//   const tokenValidation = await Validations.validateToken(token);

//   if (tokenValidation.payload) return tokenValidation;

//   const result = await BlogPost.findAll({
//     include: [{ model: User, as: 'user' }],
//   });

//   return result;
// };

// const createPost = async ({ title, content, token }) => {
//   const tokenValidation = await Validations.validateToken(token);
//   const titleValidation = Validations.validateTitle(title);
//   const contentValidation = Validations.validateContent(content);

//   if (tokenValidation.payload) return tokenValidation;
//   if (titleValidation.payload) return titleValidation;
//   if (contentValidation.payload) return contentValidation;

//   const userId = tokenValidation;

//   const newPost = await BlogPost.create({ title, content, userId });

//   return newPost;
// };

// module.exports = {
//   createPost,
//   getAllPosts,
//   getPostById,
//   deletePostById,
//   updatePostById,
// };
