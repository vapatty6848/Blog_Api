const BlogPost = (sequelize, DataTypes) => {
  const createPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: DataTypes.DATE,
    updated: DataTypes.DATE,
  },
  {
    timestamps: false,
  });

  createPost.associate = (models) => {
    createPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });
  };

  return createPost;
};

module.exports = BlogPost;
