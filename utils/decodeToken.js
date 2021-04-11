const jwt = require('jsonwebtoken');

const secret = 'segredo_blog_api';

const decodeToken = async (token) => jwt.verify(token, secret);

module.exports = decodeToken;
