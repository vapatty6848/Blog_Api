const BlogPost = (sequelize, DataTypes) => {
  const post = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  post.associate = (models) => {
    post.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return post;
};

module.exports = BlogPost;
