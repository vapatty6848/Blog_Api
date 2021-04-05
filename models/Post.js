const createPost = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'BlogPost',
    {
      // entendi que id não precisa(testar depois)
      id: { type: DataTypes.INTEGER, primaryKey: true },
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      published: { type: DataTypes.DATE, defaultValue: new Date() },
      updated: { type: DataTypes.DATE, defaultValue: new Date() },
      userId: { type: DataTypes.INTEGER, foreignKey: true },
    },
    {
      timestamps: false, // CreatedAt e UpdateAt não serão utilizados
    },
  );

  return Post;
};

module.exports = createPost;
