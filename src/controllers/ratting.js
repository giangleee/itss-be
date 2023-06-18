const asyncMiddleware = require('../middleware/async-middleware');
const httpCode = require('../utils/http-codes');
const convertResponse = require('../utils/response-helper');
const { ratingService } = require('../services');

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

  convertResponse(httpCode.CREATED_SUCCESS, 'Create review successfully', result, response);
};

module.exports = {
  createRatting: asyncMiddleware(createRatting),
};
