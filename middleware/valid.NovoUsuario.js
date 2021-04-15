const validateEmail = (email) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(email);
};

const validUsuario = (
  request,
  response,
  next,
) => {
  const { displayName, email, password } = request.body;
  if (!email) {
    return response.status(400).json({ message: '"email" is required' });
  }
  if (!validateEmail(email)) {
    return response.status(400).json({ message: '"email" must be a valid email' });
  }
  if (!password) {
    return response.status(400).json({ message: '"password" is required' });
  }
  if (password.length < 6) {
    return response.status(400).json({ message: '"password" length must be 6 characters long' });
  }
  if (displayName.length < 8) {
    return response.status(400).json({ message: '"displayName" length must be at least 8 characters long' });
  }
  next();
};

module.exports = { validUsuario };
