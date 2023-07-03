const { RattingDaos } = require('../daos');
const { ObjectId } = require('mongoose').Types;
const CustomApiMessage = require('../errors/CustomApiMessage');
const httpCode = require('../utils/http-codes');

const rattingService = {
  checkListValidObjectId: async (listObjectId) => {
    Object.values(listObjectId).forEach((item) => {
      if (!ObjectId.isValid(item))
        throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Invalid id data');
    });
  },
  getRatingDetail: async (staff_id) => {
    const result = await RattingDaos.getRatingDetail(staff_id);
    return result;
  },
  createRatingData: async (payload) => {
    return await RattingDaos.insertRatting(payload);
  },
  getListRatingByStaff: async (staff_id) => {
    if (ObjectId.isValid(staff_id)) {
      return await RattingDaos.getListRatingByStaffId(staff_id);
    }
    throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Invalid id data');
  },
};

module.exports = rattingService;
