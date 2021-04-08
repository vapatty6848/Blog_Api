function getUsers(usersList) {
  return usersList.map((element) => {
    const { password, ...userInfo } = element.dataValues;
    return userInfo;
  });
}

module.exports = getUsers;
