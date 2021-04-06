const checkInformationFromToken = (tokenDecoded, userInfoFromDataBase) => {
  if (tokenDecoded.user.displayName !== userInfoFromDataBase.dataValues.displayName) return false;
  if (tokenDecoded.user.email !== userInfoFromDataBase.dataValues.email) return false;
  if (tokenDecoded.user.password !== userInfoFromDataBase.dataValues.password) return false;

  return true;
};

module.exports = {
  checkInformationFromToken,
};
