// const bcrypt = require('bcrypt');
// const { v4 } = require('uuid');
// const models = require('./');

// const uuidv4 = v4;

// const adjustsBeforeCreate = (post) => {
//   try {
//     if (!post.id) {
//       post.id = uuidv4();
//     }
//   } catch (err) {
//     // errorHandler(err)
//     console.log(err);
//   }
// };

const BlogPosts = (sequelize, DataTypes) => {
  const BlogPostsModel = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    // userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { createdAt: 'published', updatedAt: 'updated' });

  // { hooks: { beforeCreate: adjustsBeforeCreate } }

  BlogPostsModel.associate = (models) =>
    BlogPostsModel.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });

  return BlogPostsModel;
};

module.exports = BlogPosts;
