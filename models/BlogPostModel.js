const BlogPost = (sequelize, DataTypes) => {
  const blogPostSchema = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });

  blogPostSchema.associate = (models) => {
    blogPostSchema.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
  };

  return blogPostSchema;
};

module.exports = BlogPost;
