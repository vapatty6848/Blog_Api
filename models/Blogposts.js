const BlogpostModel = (sequelize, DataTypes) => {
  const Blogpost = sequelize.define('BlogPost', {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    published: { type: DataTypes.DATE, defaultValue: new Date() },
    updated: { type: DataTypes.DATE, defaultValue: new Date() },
  },
  {
    timestamps: false,
  });

  Blogpost.associate = (models) => {
    Blogpost.belongsTo(models.User, { as: 'user', foreignKey: 'userId' });
  };

  return Blogpost;
};

module.exports = BlogpostModel;
