const validator = require('express-validator');
const { body } = validator;
/**
 * Validation rules for request.createOne
 * @returns {Array<validator.ValidationChain>} Array of validation rules
 */
const createOnerequest = () => [
  body('job')
    .notEmpty()
    .isIn(['sitters', 'cooker', 'both'])
    .withMessage("job' type must be one of ['sitters', 'cooker', 'both']"),
  body('request_detail').notEmpty().withMessage('requestDetail is required'),
  body('request_detail.work_time').notEmpty().withMessage('workTime is required'),
  body('request_detail.salary')
    .notEmpty()
    .withMessage('salary is required')
    .isFloat()
    .withMessage('salary must be a number'),
  body('request_detail.policy').notEmpty().withMessage('policy is required'),
  body('request_detail.term')
    .notEmpty()
    .withMessage('term is required')
    .isTime()
    .withMessage('term must be a time'),
];
module.exports = { requestValidation: { createOnerequest } };
