const Posts = (sequelize, DataTypes) => {
  const posts = sequelize.define('Posts', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  });

  posts.associate = (model) => {
    posts.belongsTo(model.User, { foreignKey: 'userId', as: 'user' });
  };

  return posts;
};

module.exports = Posts;
