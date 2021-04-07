'use strict';

const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
    image: DataTypes.STRING,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'user' }
  )};

  return BlogPost;
};

module.exports = BlogPost;
