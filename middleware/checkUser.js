const checkUser = (req, res, next) => {
  const unauthorized = 401;
  const { displayName, email, password, image } = req.body;
  const displayArray = displayName.split(',');
  console.log(displayArray);
};

module.exports = checkUser;
