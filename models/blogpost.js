'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BlogPost extends Model {
    static associate(models) {
      BlogPost.belongsTo(models.Users,
        { foreignKey: 'userId', as: 'user' });
    }
  }

  BlogPost.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'BlogPost',
  });

  return BlogPost;
};
