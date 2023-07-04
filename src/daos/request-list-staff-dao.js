const { RequestListStaffModel } = require('../models');
const baseDaos = require('./base-daos');

const requestListStaffDaos = {
  findOne: async (data) => {
    const response = await baseDaos.findOne(RequestListStaffModel, data);
    return response;
  },
  updateOne: async (condition, data) => {
    const response = await baseDaos.updateOne(RequestListStaffModel, condition, data);
    return response;
  },
  createRequest: async (data) => {
    const response = await baseDaos.insertData(RequestListStaffModel, data);
    return response;
  },
};

module.exports = requestListStaffDaos;
