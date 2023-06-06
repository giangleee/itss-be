const { RequestDaos, RequestDetailDaos, RequestListStaffDaos, StaffDaos } = require('../daos');
const httpCode = require('../utils/http-codes');
const asyncMiddleware = require('../middlewares/async-middleware')

/**
 * @typedef {'createOne'|'getListApplyStaff'|'removeStaffFromRequestListStaff'|'acceptStaffFromRequestListStaff'|getListProgessRequest} RequestController
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
    const requestDetail = await RequestDetailDaos.createRequestDetail({
      ...request_detail,
      user_id,
    });

    const jobValue = job === 'sitters' ? 0 : job === 'cooker' ? 1 : 2;
    const request = await RequestDaos.createRequest({
      job: jobValue,
      request_detail_id: requestDetail._id,
    });
    res
      .status(httpCode.CREATED_SUCCESS)
      .json({ message: 'Create request successfully', data: request });
  },
  getListApplyStaff: async (req, res, next) => {
    const { tab, size } = req.query;
    const { request_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ req_id: request_id });
    if (!requestListStaff) throw 'Request not found';
    const staff_ids = requestListStaff.staff_ids;
    const staffs = await StaffDaos.findWithCondition(staff_ids, tab, size);

    res
      .status(httpCode.SUCCESS)
      .json({ message: 'Get list apply staff successfully', data: staffs });
  },
  removeStaffFromRequestListStaff: async (req, res, next) => {
    const { staffs } = req.body;
    const { request_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ req_id: request_id });
    const staff_ids = requestListStaff.staff_ids;
    const newStaffIds = staff_ids.filter((staff_id) => !staffs.includes(staff_id));
    await RequestListStaffDaos.updateOne({ req_id: request_id }, { staff_ids: newStaffIds });
    res
      .status(httpCode.SUCCESS)
      .json({ message: 'Remove staff from request list staff successfully' });
  },
  acceptStaffFromRequestListStaff: async (req, res, next) => {
    const { request_id, staff_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ req_id: request_id });
    const staff_ids = requestListStaff.staff_ids.filter((id) => id !== staff_id);
    if (staff_ids.length === requestListStaff.staff_ids.length) {
      res
        .status(httpCode.BAD_REQUEST)
        .json({ message: 'Staff is not exist in request list staff' });
      return;
    }
    await RequestListStaffDaos.updateOne({ req_id: request_id }, { staff_ids });
    const request = await RequestDaos.findById(request_id);
    const request_detail_id = request.request_detail_id;
    await RequestDetailDaos.updateOne({ _id: request_detail_id }, { staff_id, status: 1 });
    res.status(httpCode.SUCCESS).json({ message: 'Accept staff successfully' });
  },
  getListProgessRequest: async (req, res, next) => {
    const { tab, size } = req.query;
    const results = await RequestDetailDaos.findWithCondition({ status: 1 });
    const requestDetails = results.map((result) => result.toJSON());
    const requests = await Promise.all(
      requestDetails.map(async (requestDetail) => {
        const request = await RequestDaos.findOne({
          request_detail_id: requestDetail._id,
        });
        return { ...request.toJSON(), request_detail: requestDetail };
      }),
    );
    res
      .status(httpCode.SUCCESS)
      .json({ message: 'Get list progess request successfully', data: requests });
  },
};
module.exports = {
  createOne: asyncMiddleware(request.createOne),
  getListApplyStaff: asyncMiddleware(request.getListApplyStaff),
  removeStaffFromRequestListStaff: asyncMiddleware(request.removeStaffFromRequestListStaff),
  acceptStaffFromRequestListStaff: asyncMiddleware(request.acceptStaffFromRequestListStaff),
  getListProgessRequest: asyncMiddleware(request.getListProgessRequest),
};
/**
 * @typedef {{job:'sitters'| 'cooker'| 'both';request_detail:{work_time:string;salary:number;policy:string;other_note?:string}}} Body
 */
