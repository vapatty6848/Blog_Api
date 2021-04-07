module.exports = {
  jwt: {
    expiresIn: '7d',
    secret: process.env.APP_SECRET || '3fafff7357635dbf3369a90210c1a5a0',
  },
};
