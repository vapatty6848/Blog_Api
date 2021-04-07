const empty = (value) => (value === undefined);

const blank = (value) => (value.length === 0);

const invalidEmail = (email) => {
  const dataPattern = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

  return !dataPattern.test(email);
};

const errorCode = 400;

const validateLoginFields = (email, password) => {
  switch (true) {
    case empty(email): return { errorCode, message: 'email' };
    case empty(password): return { errorCode, message: 'password' };
    case blank(email): return { errorCode, message: 'emailEmpty' };
    case blank(password): return { errorCode, message: 'passwordEmpty' };
    case invalidEmail(email): return { errorCode, message: 'invalidMail' };
    default: return {};
  }
};

module.exports = {
  validateLoginFields,
};
