const { StaffModel } = require('../models');
const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');

const StaffDaos = {
  findWithCondition: async (staff_ids, tab, size) => {
    try {
      const response = await StaffModel.find({ _id: { $in: staff_ids } })
        // .select('-cccd -facebook -phone_number -twitter -zalo')
        .sort({ rating_avg: -1 });
      return response;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
  getListStaffs: async (tab, size, { age, ...query }) => {
    try {
      const response = await StaffModel.find(query);
      // .select('-cccd -facebook -phone_number -twitter -zalo')
      return !age
        ? response
        : response.filter((staff) => {
            const ageStaff = new Date().getFullYear() - new Date(staff.date_of_birth).getFullYear();
            return ageStaff == age;
          });
    } catch (error) {
      console.log(error);
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
};

module.exports = StaffDaos;
