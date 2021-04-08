const express = require('express');
const { status, messages } = require('../utils');

const handleUnauthorized = (err, req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(status.UNAUTHORIZED).json({ message: messages.TOKEN_NOT_FOUND });
  }
  if (err.name === 'UnauthorizedError') {
    return res.status(status.UNAUTHORIZED).json({ message: messages.INVALID_TOKEN });
  }
};

module.exports = handleUnauthorized;