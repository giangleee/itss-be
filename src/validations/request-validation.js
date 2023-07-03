const validator = require('express-validator');
const { body, param, query } = validator;
const { JOB_TYPE } = require('../utils/constants')

const requestValidation = {
  createOneRequest: () => [
    body('job_type', "job' type must be one of ['sitters', 'cooker', 'both']")
      .notEmpty()
      .isIn(Object.values(JOB_TYPE)),
    body('request_detail', 'requestDetail is required').notEmpty(),
    body('request_detail.work_time', 'workTime is required').notEmpty(),
    body('request_detail.salary')
      .notEmpty()
      .withMessage('salary is required')
      .isFloat()
      .withMessage('salary must be a number'),
    body('request_detail.policy').notEmpty().withMessage('policy is required'),
    body('user_id', 'User Id is invalid').notEmpty().isMongoId(),
    body('staff_id', 'Staff Id is invalid').notEmpty().isMongoId(),
  ],

  getListApplyStaff: () => [
    param('request_id').notEmpty().withMessage('requestId is required'),
    param('request_id').isMongoId().withMessage('requestId must be a mongoId'),
    query('tab').optional().isNumeric().withMessage('tab must be a number'),
    query('page').optional().isNumeric().withMessage('page must be a number'),
  ],

  removeStaffFromRequestListStaff: () => [
    body('staffs').notEmpty().withMessage("staffs'id array is required"),
    body('staffs.*').isMongoId().withMessage("staffs'id must be a mongoId"),
  ],

  acceptStaffFromRequestListStaff: () => [
    param('request_id').notEmpty().withMessage('requestId is required'),
    param('request_id').isMongoId().withMessage('requestId must be a mongoId'),
    param('staff_id').notEmpty().withMessage('staffId is required'),
    param('staff_id').isMongoId().withMessage('staffId must be a mongoId'),
  ],

  getRequestBaseUserInfo: () => [
    query('user_id').isString().withMessage('Invalid query data'),
  ],

  requestDataValidate: () => [
    query('request_id').isString().withMessage('Invalid query data'),
  ]
};
module.exports = requestValidation
