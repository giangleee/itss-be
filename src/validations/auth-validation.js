const validator = require('express-validator');
const { GENDER } = require('../utils/constants');
const { body, query } = validator;

const validateEmailAndPassword = [
  body('email', 'email is required').notEmpty().isEmail(),
  body('password', 'password is required').notEmpty().isLength({ min: 6, max: 32 }),
];

const authValidation = {
  login: () => validateEmailAndPassword,

  register: () => validateEmailAndPassword,

  updateUser: () => [
    body('fullname', 'fullname is required').notEmpty().optional(),
    body('cccd', 'cccd is required').notEmpty().optional(),
    body('gender', 'gender is required').notEmpty().optional().isIn(Object.values(GENDER)),
    body('dateOfBirth', 'dateOfBirth is required').notEmpty().optional(),
    body('dateOfBirth', 'dateOfBirth is invalid').isDate().optional(),
    body('avatar', 'avatar is empty').optional().notEmpty().withMessage('avatar is empty'),
    body('address', 'address is required').notEmpty().optional(),
    body('role_id', 'roleId is required').notEmpty().optional(),
    body('role_id', 'roleId must be a mongoId').isMongoId().optional(),
    body('lang_id', 'langId is required').notEmpty().optional(),
    body('lang_id', 'landId must be a mongoId').isMongoId().optional(),
    body('phoneNumber', 'phoneNumber is required').notEmpty().optional(),
    body('phoneNumber', 'phoneNumber is invalid').isMobilePhone().optional(),
    body('address', 'address is required').notEmpty().optional(),
    body('city', 'city is required').notEmpty().optional(),
    body('district', 'district is required').notEmpty().optional(),
  ],
};

module.exports = authValidation;
