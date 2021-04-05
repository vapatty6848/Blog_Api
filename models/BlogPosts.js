const createBlogPosts = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    title: { type: DataTypes.STRING },
    content: { type: DataTypes.STRING },
    published: { type: DataTypes.DATE },
    updated: { type: DataTypes.DATE },
    userId: { foreignKey: true, type: DataTypes.INTEGER },
  },
  {
    timestamps: false,
  });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users,
      { foreignKey: 'id', as: 'user' });
  };
  return BlogPosts;
};

module.exports = createBlogPosts;
