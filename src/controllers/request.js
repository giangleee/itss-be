const { RequestDaos, RequestDetailDaos, RequestListStaffDaos, StaffDaos } = require('../daos');
const httpCode = require('../utils/http-codes');
const moongose = require('mongoose');
const asyncMiddleware = require('../middleware/async-middleware');
const convertResponse = require('../utils/response-helper');
const { requestService } = require('../services');
const { STATUS_CODE } = require('../utils/constants');

const request = {
  createOne: async (req, res) => {
    const { job_type, user_id, request_detail } = req.body;

    const requestDetail = await RequestDetailDaos.createRequestDetail({
      ...request_detail,
      user_id,
      status: STATUS_CODE.IS_ON_HOLD,
    });

    const request = await RequestDaos.createRequest({
      job: job_type,
      request_detail_id: requestDetail._id,
    });

    const requestListStaff = await RequestListStaffDaos.createRequest({
      request_id: request._id,
      user_id,
    });

    convertResponse(httpCode.CREATED_SUCCESS, 'Create request successfully', request, res);
  },
  getListApplyStaff: async (req, res) => {
    const { tab, size } = req.query;
    const { request_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ request_id: request_id });
    if (!requestListStaff) throw 'Request not found';
    const staff_ids = requestListStaff.staff_ids;
    const staffs = await StaffDaos.findWithCondition(staff_ids, tab, size);

    convertResponse(null, 'Get list apply staff successfully', staffs, res);
  },
  removeStaffFromRequestListStaff: async (req, res) => {
    const { staffs } = req.body;
    const { request_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ request_id: request_id });
    const staff_ids = requestListStaff.staff_ids;
    const newStaffIds = staff_ids.filter((staff_id) => !staffs.includes(staff_id.toString()));
    await RequestListStaffDaos.updateOne({ request_id: request_id }, { staff_ids: newStaffIds });

    convertResponse(null, 'Remove staff from request list staff successfully', null, res);
  },
  acceptStaffFromRequestListStaff: async (req, res) => {
    const { request_id, staff_id } = req.params;
    const requestListStaff = await RequestListStaffDaos.findOne({ request_id: request_id });
    const staff_ids = requestListStaff.staff_ids.filter((id) => id.toString() !== staff_id);
    if (staff_ids.length === requestListStaff.staff_ids.length) {
      res
        .status(httpCode.BAD_REQUEST)
        .json({ message: 'Staff is not exist in request list staff' });
      return;
    }
    await RequestListStaffDaos.updateOne({ request_id: request_id }, { staff_ids });
    const request = await RequestDaos.findById(request_id);
    const request_detail_id = request.request_detail_id;
    await RequestDetailDaos.updateOne({ _id: request_detail_id }, { staff_id, status: 1 });

    convertResponse(null, 'Accept staff successfully', null, res);
  },
  getListProgessRequest: async (req, res) => {
    const { tab, size } = req.query;
    const userId = req.payload.userId;
    const results = await RequestDetailDaos.findWithCondition(
      { status: STATUS_CODE.IS_ON_HOLD, user_id: userId},
      tab,
      size,
      { createdAt: -1 },
    );
    const requestDetails = results.map((result) => result.toJSON());
    const requests = await Promise.all(
      requestDetails.map(async (requestDetail) => {
        const request = await RequestDaos.findOne({
          request_detail_id: requestDetail._id,
        });
        return { ...request.toJSON(), request_detail: requestDetail };
      }),
    );

    convertResponse(null, 'Get list progress request successfully', requests, res);
  },
  getListRequestBaseUser: async (request, response) => {
    const { user_id } = request.query;
    await requestService.checkValidObjectId(user_id);
    const result = await requestService.getRequestByUserId(user_id);

    convertResponse(null, 'Get list user request successfully', result, response);
  },
  getRequestDetail: async (request, response) => {
    const { request_id } = request.query;
    await requestService.checkValidObjectId(request_id);
    const result = await requestService.getRequestDetail(request_id);

    convertResponse(null, 'Get request detail successfully', result, response);
  },
};
module.exports = {
  createOne: asyncMiddleware(request.createOne),
  getListApplyStaff: asyncMiddleware(request.getListApplyStaff),
  removeStaffFromRequestListStaff: asyncMiddleware(request.removeStaffFromRequestListStaff),
  acceptStaffFromRequestListStaff: asyncMiddleware(request.acceptStaffFromRequestListStaff),
  getListProgessRequest: asyncMiddleware(request.getListProgessRequest),
  getListRequestBaseUser: asyncMiddleware(request.getListRequestBaseUser),
  getRequestDetail: asyncMiddleware(request.getRequestDetail),
};
