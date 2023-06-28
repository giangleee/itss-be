const httpCode = require('../utils/http-codes')

/**
 * @type {import('express').ErrorRequestHandler}
 */
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (typeof err === 'string') {
      return res.status(httpCode.BAD_REQUEST).json({
        message: err,
      });
    }
    res.status(httpCode.INTERNAL_SERVER_ERROR).json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  next();
};
module.exports = errorHandler;
