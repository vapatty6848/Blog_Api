const createBlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });
  BlogPosts.associate = (model) => {
    BlogPosts.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };
  return BlogPosts;
};

module.exports = createBlogPosts;
