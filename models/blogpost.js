const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return blogpost;
};

module.exports = BlogPost;
