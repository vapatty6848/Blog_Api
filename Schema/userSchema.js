const blank = (value) => (!value);

const invalidEmail = (email) => {
  const dataPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !dataPattern.test(email);
};

const invalidPassword = (value) => value.length < 6;

const invalidName = (name) => name.length < 8;

const errorCode = 400;

const validateUserFields = (name, email, password) => {
  switch (true) {
    case blank(name): return { errorCode, message: 'name' };
    case blank(email): return { errorCode, message: 'email' };
    case blank(password): return { errorCode, message: 'password' };
    case invalidName(name): return { errorCode, message: 'nameLess8' };
    case invalidEmail(email): return { errorCode, message: 'invalidMail' };
    case invalidPassword(password): return { errorCode, message: 'passLess6' };
    default: return {};
  }
};

module.exports = {
  validateUserFields,
};
