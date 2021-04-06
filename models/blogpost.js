'use strict';

const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    id: DataTypes.INTEGER,
    title: {
      type: DataTypes.TEXT
    },
    content: DataTypes.TEXT,
    userId: {
      type: DataTypes.INTEGER,
      validate: {
        len: [6]
      }
    },
    image: DataTypes.STRING,
  });

  return BlogPost;
};

module.exports = BlogPost;
