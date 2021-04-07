const BlogPost = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    user_id: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User,
      { foreignKey: 'userId', as: 'posts' });
  };

  return BlogPosts;
};

module.exports = BlogPost;
