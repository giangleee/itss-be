const asyncMiddleware = require('../middleware/async-middleware');
const httpCode = require('../utils/http-codes');
const convertResponse = require('../utils/response-helper');
const { ratingService } = require('../services');
const { RequestDaos, RequestDetailDaos, StaffDaos } = require('../daos');
const constants = require('../utils/constants');
const rattingService = require('../services/ratting-service');
const rattingDaos = require('../daos/ratting-daos');

const createRatting = async (request, response) => {
  const {
    user_id,
    staff_id,
    request_id,
    data: { ratting, comment },
  } = request.body;
  const payload = { user_id, staff_id, request_id };

  await ratingService.checkListValidObjectId(payload);
  const result = await ratingService.createRatingData({
    user_id,
    staff_id,
    request_id,
    ratting,
    comment,
  });
  const requestDetail = await RequestDaos.findById(request_id);
  const requestDetailId = requestDetail.request_detail_id;
  await RequestDetailDaos.updateOne(
    { _id: requestDetailId },
    { $set: { status: constants.STATUS_CODE.IS_COMPLETED } },
  );

  const listRatingStaff = await rattingDaos.findByCondition({ staff_id });
  const aveRatingData = await ratingService.caculateRatingNumber(listRatingStaff);
  await StaffDaos.updateOne(
    {
      _id: staff_id,
    },
    { $set: { rating_avg: aveRatingData } },
  );

  convertResponse(httpCode.CREATED_SUCCESS, 'Create review successfully', result, response);
};

const getRatingDetail = async (request, response) => {
  const { staff_id } = request.query;
  const result = await rattingService.getListRatingByStaff(staff_id);

  convertResponse(httpCode.SUCCESS, 'Get list ratting by staff successfully', result, response);
};

module.exports = {
  createRatting: asyncMiddleware(createRatting),
  getRatingDetail: asyncMiddleware(getRatingDetail),
};
