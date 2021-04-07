const BlogPosts = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW,
    },
  },
  { timestamps: false });

  blogPost.associate = (models) => {
    blogPost.belongsTo(models.Users, { foreignKey: 'userId', as: 'user' });
  };

  return blogPost;
};

module.exports = BlogPosts;
