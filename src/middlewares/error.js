/**
 * @type {import('express').ErrorRequestHandler}
 */
const errorHandler = (err, req, res, next) => {
  if (err) {
    if (typeof err === 'string') {
      return res.status(400).json({
        message: err,
      });
    }
    res.status(500).json({
      message: err.message,
      stack: err.stack,
    });
    return;
  }
  next();
};
module.exports = errorHandler;
