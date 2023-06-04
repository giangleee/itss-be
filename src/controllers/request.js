const {
  RequestDetailModel,
  RequestModel,
  RequestListStaffModel,
  StaffModel,
} = require('../models');
/**
 * @type {Record<string, import('express').RequestHandler>}
 */
const request = {
  /**
   * Create a new request
   * @param {import('express').Request<Record<string,string>,any,Body,any>} req
   */
  createOne: async (req, res, next) => {
    try {
      const { job, request_detail } = req.body;
      // TODO: Fake user id
      const user_id = '5f9d7b3b3f0b7c2b1c3b3b3b';
      const requestDetail = await RequestDetailModel.create({
        ...request_detail,
        user_id,
      });
      const jobValue = job === 'sitters' ? 0 : job === 'cooker' ? 1 : 2;
      const request = await RequestModel.create({
        job: jobValue,
        request_detail_id: requestDetail._id,
      });
      res.status(201).json({ message: 'Create request successfully', data: request });
    } catch (error) {
      next(error);
    }
  },
  getListApplyStaff: async (req, res, next) => {
    try {
      const { request_id } = req.params;
      const requestListStaff = await RequestListStaffModel.findOne({ req_id: request_id });
      const staff_ids = requestListStaff.staff_ids;
      const staffs = await StaffModel.find({ _id: { $in: staff_ids } })
        .select('-cccd -facebook -phone_number -twitter -zalo')
        .sort({ rating_avg: -1 });
      res.json({ message: 'Get list apply staff successfully', data: staffs });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = request;
/**
 * @typedef {{job:'sitters'| 'cooker'| 'both';request_detail:{work_time:string;salary:number;policy:string;other_note?:string}}} Body
 */
