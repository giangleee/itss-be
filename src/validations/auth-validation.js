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

  getUserData: () => [query('token', 'Token is required').notEmpty()],

  updateUser: () => [
    body('fullname', 'fullname is required').notEmpty().optional(),
    body('cccd', 'cccd is required').notEmpty().optional(),
    body('gender', 'gender is required').notEmpty().optional().isIn(Object.values(GENDER)),
    body('date_of_birth', 'dateOfBirth is required').notEmpty().optional(),
    body('date_of_birth', 'dateOfBirth is invalid').isDate().optional(),
    body('avatar', 'avatar is empty').optional().notEmpty().withMessage('avatar is empty'),
    body('address', 'address is required').notEmpty().optional(),
    body('role_id', 'roleId is required').notEmpty().optional(),
    body('role_id', 'roleId must be a mongoId').isMongoId().optional(),
    body('lang_id', 'langId is required').notEmpty().optional(),
    body('lang_id', 'landId must be a mongoId').isMongoId().optional(),
    body('phone_number', 'phoneNumber is required').notEmpty().optional(),
    body('phone_number', 'phoneNumber is invalid').isMobilePhone().optional(),
  ],
};

module.exports = authValidation;
