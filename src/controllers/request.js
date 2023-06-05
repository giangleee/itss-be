const { RequestDaos, RequestDetailDaos, RequestListStaffDaos, StaffDaos } = require('../daos');
const httpCode = require('../utils/http-codes')

/**
 * @typedef {'createOne'|'getListApplyStaff'} RequestController
 * @type {Record<RequestController, import('express').RequestHandler>}
 */
const request = {
  /**
   * Create a new request
   * @param {import('express').Request<Record<string,string>,any,Body,any>} req
   */
  createOne: async (req, res, next) => {
    const { job, request_detail } = req.body;
    // TODO: Fake user id
    const user_id = '5f9d7b3b3f0b7c2b1c3b3b3b';
    const requestDetail = await RequestDetailDaos.createRequest({
      ...request_detail,
      user_id,
    });

    const jobValue = job === 'sitters' ? 0 : job === 'cooker' ? 1 : 2;
    const request = await RequestDaos.createRequest({
      job: jobValue,
      request_detail_id: requestDetail._id,
    });
    res.status(httpCode.CREATED_SUCCESS).json({ message: 'Create request successfully', data: request });
  },
  getListApplyStaff: async (req, res, next) => {
    const { request_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ req_id: request_id });

    const staff_ids = requestListStaff.staff_ids;
    const staffs = await StaffDaos.findWithCondition(staff_ids);

    res.status(httpCode.SUCCESS).json({ message: 'Get list apply staff successfully', data: staffs });
  },
};
module.exports = request;
/**
 * @typedef {{job:'sitters'| 'cooker'| 'both';request_detail:{work_time:string;salary:number;policy:string;other_note?:string}}} Body
 */
