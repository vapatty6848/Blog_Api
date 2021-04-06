export const sendError = (err, res) => {
  const { statusCode, message } = err;

  res.status(statusCode).json({
    message,
  });
};

export class ThrowError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}
