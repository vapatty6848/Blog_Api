module.exports = {
  jwt: {
    options: {
      expiresIn: '3d',
      algorithm: 'HS256',
    },
    secret: 'blogsAPI',
  },
};
