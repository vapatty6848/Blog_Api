const CreatePost = (sequelize, DataTypes) => {
  const Post = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  Post.associate = (models) => {
    Post.belongsTo(models.User,
      { foreingKey: 'userId', as: 'user' });
  };

  return Post;
};

module.exports = CreatePost;
