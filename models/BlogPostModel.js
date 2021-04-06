const BlogPost = (sequelize, DataTypes) => {
  const blogPostSchema = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.STRING,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Users,
      { foreignKey: 'userId', as: 'userId' });
  };

  return blogPostSchema;
};

module.exports = BlogPost;
