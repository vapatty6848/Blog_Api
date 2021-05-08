const { DataTypes } = require('sequelize');

const User = require('./User');

const sequelize = require('../index');

const BlogPost = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: DataTypes.INTEGER,
}, {
  tableName: 'BlogPosts',
  timestamps: true,
  createdAt: 'published',
  updatedAt: 'updated',
});

BlogPost.belongsTo(User, {
  onDelete: 'CASCADE',
  onUpdate: 'CASCADE',
  as: 'user',
});

module.exports = BlogPost;
