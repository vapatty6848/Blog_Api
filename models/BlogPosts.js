const BlogPosts = (sequelize, DataTypes) => {
  const blogPost = sequelize.define('BlogPosts', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: {
      type: DataTypes.INTEGER, foreignKey: true },
  },
  { timestamps: false });

  BlogPosts.associate = (models) => {
    BlogPosts.belongsTo(models.Users, {
      foreignKey: 'userId', as: 'userPosts' });
  };
  return blogPost;
};

module.exports = BlogPosts;
