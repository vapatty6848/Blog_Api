module.exports = (err, _req, res, _next) => {
  const code500 = 500;
  res.status(err.statusCode || code500).json(err.message);
};
