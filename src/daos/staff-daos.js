const { StaffModel } = require('../models');
const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');
const baseDaos = require('./base-daos');
const { ObjectId } = require('mongoose').Types;
const _ = require('lodash');

const StaffDaos = {
  findWithCondition: async (staff_ids, tab, size) => {
    try {
      const response = await StaffModel.find({ _id: { $in: staff_ids } }).sort({ rating_avg: -1 });

      return response;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
  getListStaffs: async (tab, size, { age, ...query }) => {
    try {
      const response = await StaffModel.find(query);

      return !age
        ? response
        : response.filter((staff) => {
            const ageStaff = new Date().getFullYear() - new Date(staff.date_of_birth).getFullYear();
            return ageStaff == age;
          });
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
  getStaff: async (_id) => {
    if (ObjectId.isValid(_id)) {
      const findResult = await baseDaos.findOne(StaffModel, { _id });
      if (_.isNil(findResult))
        throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Can not found staff');
      return findResult;
    }
  },
};

module.exports = StaffDaos;
