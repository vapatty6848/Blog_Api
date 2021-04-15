const { DataTypes } = require('sequelize');
const sequelize = require('../index');
const User = require('./User');

const BlogPostData = sequelize.define('BlogPost', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: DataTypes.STRING,
  content: DataTypes.STRING,
  userId: DataTypes.INTEGER,
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
}, { timestamps: true, tableName: 'BlogPosts', createdAt: 'published', updatedAt: 'updated' });

BlogPostData.belongsTo(User, { onDelete: 'CASCADE', onUpdate: 'CASCADE', as: 'user' });

module.exports = BlogPostData;
