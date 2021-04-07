const verifyBodyData = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const regexEmail = /^[a-z0-9._]+@[a-z0-9]+\.[a-z]+$/i;
  let message;
  message = '"displayName" length must be at least 8 characters long';
  if (displayName.length < 8) return res.status(400).json({ message });
  message = '"email" is required';
  if (!email || email === '') return res.status(400).json({ message });
  message = '"email" must be a valid email';
  if (!regexEmail.test(email)) return res.status(400).json({ message });
  message = '"password" is required';
  if (!password || password === '') return res.status(400).json({ message });
  message = '"password" length must be 6 characters long';
  if (password.length < 6) return res.status(400).json({ message });

  next();
};

module.exports = { verifyBodyData };
