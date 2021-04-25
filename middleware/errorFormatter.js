const errorFormatter = (e) => {
  const message = e.errors ? e.errors[0].message : e.parent.sqlMessage;
  switch (message) {
    case 'Validation len on displayName failed':
      return { status: 400, msg: '"displayName" length must be at least 8 characters long' };
    case 'Validation isEmail on email failed':
      return { status: 400, msg: '"email" must be a valid email' };
    case 'Field \'email\' doesn\'t have a default value':
      return { status: 400, msg: '"email" is required' };
    case 'Validation len on password failed':
      return { status: 400, msg: '"password" length must be 6 characters long' };
    case 'Field \'password\' doesn\'t have a default value':
      return { status: 400, msg: '"password" is required' };
    case 'Users.email must be unique':
      return { status: 409, msg: 'Usuário já existe' };
    default:
      return message;
  }
};

module.exports = errorFormatter;
