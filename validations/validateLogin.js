const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validateLogin = (request, response, next) => {
  const { email, password } = request.body;
  if (email === '') {
    return response.status(400).json({ message: '"email" is not allowed to be empty' });
  }
  if (email === undefined) {
    return response.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return response.status(400).json({ message: '"email" must be a valid email' });
  }
  if (password === '') {
    return response.status(400).json({ message: '"password" is not allowed to be empty' });
  }
  if (password === undefined) {
    return response.status(400).json({ message: '"password" is required' });
  }
  next();
};

module.exports = { validateLogin };
