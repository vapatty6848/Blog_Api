const objErrValidation = (err, status) => ({ err, status });

const objErrRes = (err) => ({ message: err });

module.exports = {
  objErrValidation,
  objErrRes,
};
