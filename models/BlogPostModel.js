const BlogPost = (sequelize, DataTypes) => {
  const blogPostSchema = sequelize.define('BlogPost', {
    id: DataTypes.INTEGER,
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {
    timestamps: false,
  });

  BlogPost.associate = (models) => {
    BlogPost.belongsTo(models.Employees,
      { foreignKey: 'employee_id', as: 'addresses' });
  };

  return blogPostSchema;
};

module.exports = BlogPost;
