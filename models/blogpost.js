module.exports = (sequelize, DataType) => {
  const BlogPost = sequelize.define(
    'Post', { id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataType.INTEGER,
    },
    title: { type: DataType.STRING },
    content: { type: DataType.STRING },
    userId: { type: DataType.INTEGER },
    published: { type: DataType.STRING },
    updated: { type: DataType.STRING },
    },
    { timestamps: false },
  );

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.User, { foreignKey: 'userId', as: 'user id' });
  };

  return BlogPost;
};
