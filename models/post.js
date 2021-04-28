module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'BlogPosts',
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  };

  return Post;
};
