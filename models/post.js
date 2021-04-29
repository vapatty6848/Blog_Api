const Post = (sequelize, DataTypes) => {
  const Posts = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    content: DataTypes.STRING,
  },
  {
    timestamps: false,
  });

  return Posts;
};

module.exports = Post;
