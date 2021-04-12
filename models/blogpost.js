const BlogPost = (sequelize, DataTypes) => {
  const blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  });

  blogpost.associate = (models) => {
    blogpost.belongsTo(models.User, { foreignKey: 'id', as: 'users' });
  };

  return blogpost;
};

module.exports = BlogPost;
