// const bcrypt = require('bcrypt');

// const generateHash = async (user) => {
//   try {
//     if (!user.id) {
//       const hashedPass = await bcrypt.hash(user.password, 9);
//       user.password = hashedPass;
//     }
//   } catch (err) {
//     // errorHandler(err)
//     console.log(err);
//   }
// };

const Users = (sequelize, DataTypes) => {
  const UsersModel = sequelize.define('Users', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING,
  },
  {
    hooks: {
      // beforeCreate: generateHash(user),
    },
  });

  return UsersModel;
};

module.exports = Users;
