module.exports = (sequelize, DataTypes) => {
  const BlogPosts = sequelize.define('BlogPosts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  }, {
    timestamps: false,
  });
  BlogPosts.associate = (model) => {
    BlogPosts.belongsTo(model.User, { as: 'user', foreignKey: 'userId' });
  };
  return BlogPosts;
};
