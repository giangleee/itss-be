/**
 * @type {import('express').ErrorRequestHandler}
 */
const errorHandler = (err, req, res, next) => {
  if (err) {
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
  }
  next();
};
module.exports = errorHandler;
