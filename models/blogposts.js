const BlogPosts = (sequelize, DataTypes) => {
  const blogPostsModel = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    image: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });

  blogPostsModel.associate = (models) => {
    blogPostsModel.belongsTo(models.Users,
      { foreignKey: 'user_id', as: 'posts' });
  };

  return blogPostsModel;
};

module.exports = BlogPosts;
