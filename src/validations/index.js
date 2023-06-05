const validator = require('express-validator');
const { body, param, query } = validator;
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
  body('request_detail.term').notEmpty().withMessage('term is required'),
];
const getListApplyStaff = () => [
  param('request_id').notEmpty().withMessage('requestId is required'),
  param('request_id').isMongoId().withMessage('requestId must be a mongoId'),
  query('tab').optional().isNumeric().withMessage('tab must be a number'),
  query('page').optional().isNumeric().withMessage('page must be a number'),
];
const removeStaffFromRequestListStaff = () => [
  body('staffs').notEmpty().withMessage("staffs'id array is required"),
  body('staffs.*').isMongoId().withMessage("staffs'id must be a mongoId"),
];
const acceptStaffFromRequestListStaff = () => [
  param('request_id').notEmpty().withMessage('requestId is required'),
  param('request_id').isMongoId().withMessage('requestId must be a mongoId'),
  param('staff_id').notEmpty().withMessage('staffId is required'),
  param('staff_id').isMongoId().withMessage('staffId must be a mongoId'),
];
const login = () => [
  body('email').notEmpty().withMessage('email is required'),
  body('email').isEmail().withMessage('email is invalid'),
  body('password').notEmpty().withMessage('password is required'),
  body('password')
    .isLength({ min: 6, max: 32 })
    .withMessage('password must be between 6 and 32 characters'),
];
//genderdate_of_birthavataraddressrole_idlang_idcreate_atphone_number
const register = () => [
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
];
module.exports = {
  requestValidation: {
    createOnerequest,
    getListApplyStaff,
    removeStaffFromRequestListStaff,
    acceptStaffFromRequestListStaff,
  },
  authValidation: { login, register },
};
