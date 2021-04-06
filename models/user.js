'use strict';

const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: DataTypes.INTEGER,
    fullname: {
      type: DataTypes.STRING,
      validate: {
        len: [8]
      }
    },
    email: DataTypes.STRING,
    password: {
      type: DataTypes.INTEGER,
      validate: {
        len: [6]
      }
    },
    image: DataTypes.STRING,
  });

  Users.associate = (models) => {
    Users.hasMany(models.BlogPosts,
      { foreignKey: 'userId', as: 'blogposts' });
  };


  return User;
};

module.exports = User;
