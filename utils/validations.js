const { Op } = require('sequelize');
const { User, BlogPost } = require('../models');
const decodeToken = require('./decodeToken');

// name validation
const isValidName = (name) => {
  if (name.length < 8 || name === '') {
    return false;
  }
  return true;
};

// check if have a email field
const haveEmailField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('email')) {
    return false;
  }
  return true;
};

// check if the email entered is valid
const isValidEmail = (email) => {
  const emailValid = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);
  if (!emailValid) {
    return false;
  }
  return true;
};

// // check if have a password field
const havePasswordField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('password')) {
    return false;
  }
  return true;
};

// check if the password entered is valid
const isValidPassword = (password) => {
  if (password.length < 6) {
    return false;
  }
  return true;
};

// check if email is not empty
const EmptyEmail = (bodyObj) => {
  if (bodyObj.email === '') {
    return true;
  }
  return false;
};

// check if password is not empty
const EmptyPassword = (bodyObj) => {
  if (bodyObj.password === '') {
    return true;
  }
  return false;
};

// check if user exists
const userExists = async (bodyObj) => {
  const foundUser = await User.findOne({
    raw: true,
    where: {
      email: bodyObj.email,
      password: parseInt(bodyObj.password, 10),
    },
  });

  return foundUser;
};

// check if have a password field
const haveTokenField = (reqHeader) => {
  if (reqHeader.authorization === '') {
    return false;
  }
  return true;
};

// check if have a content field
const haveContentField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('content')) {
    return false;
  }
  return true;
};

// check if have a title field
const haveTitleField = (bodyObj) => {
  if (!Object.keys(bodyObj).includes('title')) {
    return false;
  }
  return true;
};

const isTheUserWhoCreatedThePost = async (id, token) => {
  const foundPost = await BlogPost.findByPk(id, { raw: true, include: { model: User, as: 'user' } });

  const decodedToken = await decodeToken(token);

  if (foundPost['user.email'] === decodedToken.email) {
    return true;
  }
  return false;
};

const postExist = async (id) => {
  const foundPost = await BlogPost.findByPk(id);
  if (!foundPost) {
    return false;
  }
  return true;
};

// await BlogPost.findAll({});
const isEmptyParams = (query) => {
  if (query === null || undefined) {
    return true;
  }
  return false;
};

const findPostByParam = async (query) => {
  const findPosts = await BlogPost.findAll({
    where: {
      [Op.or]: [
        { title: { [Op.like]: `%${query}%` } },
        { content: { [Op.like]: `%${query}%` } },
      ],
    },
    include: { model: User, as: 'user' },
  });

  return findPosts;
};

module.exports = {
  isValidName,
  haveEmailField,
  isValidEmail,
  havePasswordField,
  isValidPassword,
  EmptyEmail,
  EmptyPassword,
  userExists,
  haveTokenField,
  haveContentField,
  haveTitleField,
  isTheUserWhoCreatedThePost,
  postExist,
  isEmptyParams,
  findPostByParam,
};
