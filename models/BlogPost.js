const BlogPost = (sequelize, DataTypes) => {
  const posts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false });

  posts.associate = (models) => {
    posts.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = BlogPost;
