const Sequelize = require('sequelize');

const config = require('../../config/config');
const Post = require('./Post');
const User = require('./User');

const env = process.env.NODE_ENV || 'development';

const sequelize = new Sequelize(
  config[env].database,
  config[env].username,
  config[env].password,
  config[env],
);

const db = {
  Post: Post(sequelize, Sequelize.DataTypes),
  User: User(sequelize, Sequelize.DataTypes),
};

db.Post.associate(db);
db.User.associate(db);
db.Sequelize = Sequelize;

module.exports = db;
