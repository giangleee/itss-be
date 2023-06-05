const { StaffModel } = require('../models');
const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');

const StaffDaos = {
  findWithCondition: async (staff_ids) => {
    try {
      const response = await StaffModel.find({ _id: { $in: staff_ids } })
        .select('-cccd -facebook -phone_number -twitter -zalo')
        .sort({ rating_avg: -1 });
      return response;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
};

module.exports = StaffDaos;
