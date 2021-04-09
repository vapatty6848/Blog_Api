const UNHANDLED_ERROR_STATUS = 500;
const UNHANDLED_ERROR = 'internal Error';

const handleError = (err, req, res, next) => {
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
