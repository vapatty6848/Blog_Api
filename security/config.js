require('dotenv').config();

module.exports = {
  jwt: {
    options: {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
    secret: process.env.JWT_SECRET || 'blogsAPI',
  },
};
