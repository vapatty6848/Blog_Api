const UNHANDLED_ERROR = 'Internal Error';
const UNHANDLED_ERROR_STATUS = 500;

const handleError = (err, _req, res, _next) => {
  const { payload, status } = err;
  console.log(err);
  if (!payload) {
    return res.status(UNHANDLED_ERROR_STATUS)
      .json({ error: UNHANDLED_ERROR });
  }
  return res.status(status).json(payload);
};

module.exports = {
  handleError,
};
