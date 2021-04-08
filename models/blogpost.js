const createBlogPost = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.TEXT,
    content: DataTypes.TEXT,
  },
  { timestamps: false });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User);
  };

  return BlogPost;
};

module.exports = createBlogPost;
