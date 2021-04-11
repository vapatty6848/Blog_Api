// const { Sequelize } = require('sequelize');

// const BlogPost = (sequelize, DataTypes) => {
//   const BlogPosts = sequelize.define('BlogPost', {
//     title: DataTypes.STRING,
//     content: DataTypes.STRING,
//     userId: { type: DataTypes.INTEGER, foreignKey: true },
//     published: Sequelize.DATE,
//     updated: Sequelize.DATE,
//   });

//   BlogPosts.associate = (models) => {
//     BlogPosts.belongsTo(models.User,
//       { foreignKey: 'userId', as: 'user' });
//   };

//   return BlogPosts;
// };

// module.exports = BlogPost;

// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class BlogPost extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   };
//   BlogPost.init({
//     title: DataTypes.STRING
//   }, {
//     sequelize,
//     modelName: 'BlogPost',
//   });
//   return BlogPost;
// };
