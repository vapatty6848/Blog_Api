const BlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define("BlogPost", {
    content: DataTypes.STRING,
    updated: DataTypes.DATE,
    userId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    published: DataTypes.DATE,
  });
  
  return BlogPost;
};

module.exports = BlogPost;