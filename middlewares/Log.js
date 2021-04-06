module.exports = (req, _res, next) => {
  console.warn({
    date: new Date(),
    method: req.method,
    route: req.originalUrl,
  });
  next();
};
