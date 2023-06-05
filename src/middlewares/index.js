const validate = require('./validate');
const errorHandler = require('./error');
const authMiddleware = require('./auth');

module.exports = {
  validate,
  errorHandler,
  authMiddleware,
};
