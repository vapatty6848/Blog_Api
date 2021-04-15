const BlogPost = (sequelize, DataTypes) => {
  const BlogPostData = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, { timestamps: false, tableName: 'BlogPosts' });

  BlogPostData.belongsTo('User', { foreignKey: 'userId', as: 'user' });
  return BlogPostData;
};

module.exports = BlogPost;
