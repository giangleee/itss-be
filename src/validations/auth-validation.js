const validator = require('express-validator');
const { body } = validator;
/**
 * Validation rules for request.createOne
 * @returns {Array<validator.ValidationChain>} Array of validation rules
 */
const authValidation = {
  login: () => [
    body('email').notEmpty().withMessage('email is required'),
    body('email').isEmail().withMessage('email is invalid'),
    body('password').notEmpty().withMessage('password is required'),
    body('password')
      .isLength({ min: 6, max: 32 })
      .withMessage('password must be between 6 and 32 characters'),
  ],

  register: () => [
    body('email').notEmpty().withMessage('email is required'),
    body('email').isEmail().withMessage('email is invalid'),
    body('password').notEmpty().withMessage('password is required'),
    body('password')
      .isLength({ min: 6, max: 32 })
      .withMessage('password must be between 6 and 32 characters'),
    body('fullname').notEmpty().withMessage('fullname is required'),
    body('cccd').notEmpty().withMessage('cccd is required'),
    body('gender').notEmpty().withMessage('gender is required'),
    body('gender')
      .isIn(['male', 'female', 'other'])
      .withMessage("gender must be one of ['male', 'female', 'other']"),
    body('date_of_birth').notEmpty().withMessage('dateOfBirth is required'),
    body('date_of_birth').isDate().withMessage('dateOfBirth is invalid'),
    body('avatar').optional().notEmpty().withMessage('avatar is empty'),
    body('address').notEmpty().withMessage('address is required'),
    body('role_id').notEmpty().withMessage('roleId is required'),
    body('role_id').isMongoId().withMessage('roleId must be a mongoId'),
    body('lang_id').notEmpty().withMessage('langId is required'),
    body('lang_id').isMongoId().withMessage('langId must be a mongoId'),
    body('phone_number').notEmpty().withMessage('phoneNumber is required'),
    body('phone_number').isMobilePhone().withMessage('phoneNumber is invalid'),
  ],
};

module.exports = authValidation
