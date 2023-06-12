const validator = require('express-validator');
const { body, param, query } = validator;
/**
 * Validation rules for request.createOne
 * @returns {Array<validator.ValidationChain>} Array of validation rules
 */
const requestValidation = {
  createOneRequest: () => [
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
};
module.exports = requestValidation
