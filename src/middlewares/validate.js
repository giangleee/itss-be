const validator = require('express-validator');
/**
 * @param {validator.ValidationChain[]} validations
 * @returns {import('express').RequestHandler}
 */
const validate = (validations) => async (req, res, next) => {
  await Promise.all(validations.map((validation) => validation.run(req)));
  const errors = validator.validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(400).json({
    message: 'Validation errors',
    errors: errors.array(),
  });
};
module.exports = validate;
