const BlogPost = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
  }, { timestamps: false });

  post.associate = (models) => {
    post.belongsTo(models.User,
      { foreignKey: 'id', as: 'users' });
  };
  return post;
};

module.exports = BlogPost;
