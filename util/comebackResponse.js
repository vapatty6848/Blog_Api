module.exports = (res, status, messageLine) => res.status(status)
  .json({ message: messageLine });
