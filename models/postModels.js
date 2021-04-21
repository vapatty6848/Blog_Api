const Post = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
    updated: {
      defaultValue: new Date(),
      type: DataTypes.DATE,
    },
  },
  { timestamps: false });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return blogPost;
};

module.exports = Post;
