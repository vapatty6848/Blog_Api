require('dotenv').config();

module.exports = {
  development: {
    host: process.env.HOSTNAME,
    database: 'blogs_api',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: 'mysql',
  },
  test: {
    host: process.env.HOSTNAME,
    database: 'blogs_api',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: 'mysql',
  },
  production: {
    host: process.env.HOSTNAME,
    database: 'blogs_api',
    username: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    dialect: 'mysql',
  },
};
