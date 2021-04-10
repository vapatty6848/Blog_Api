const BlogPosts = (sequelize, DataTypes) => {
  const blogPostsModel = sequelize.define('BlogPosts', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: {
      type: DataTypes.INTEGER,
      foreignKey: true,
    },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  { timestamps: false });

  blogPostsModel.associate = (models) => {
    blogPostsModel.belongsTo(models.Users, { foreignKey: 'user_id', as: 'user' });
  };

  return blogPostsModel;
};

module.exports = BlogPosts;
