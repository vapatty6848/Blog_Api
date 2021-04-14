const BlogPosts = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.STRING, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'id', as: 'posts' });
  };

  return BlogPost;
};

module.exports = BlogPosts;
