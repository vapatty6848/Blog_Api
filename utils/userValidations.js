const nameHasValidLength = (displayName) => displayName.length >= 8;

const passwordHasValidLength = (password) => password.length === 6;

const emailIsValid = (email) => /^\S+@\S+$/.test(email);

module.exports = {
  nameHasValidLength,
  emailIsValid,
  passwordHasValidLength,
};
