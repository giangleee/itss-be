const { RequestDetailModel } = require('../models');
const baseDaos = require('./base-daos');

const requestDetailDaos = {
  createRequestDetail: async (data) => {
    const response = await baseDaos.insertData(RequestDetailModel, data);
    return response;
  },
  findById: async (id) => {
    const response = await baseDaos.findById(RequestDetailModel, id);
    return response;
  },
  updateOne: async (condition, data) => {
    const response = await baseDaos.updateOne(RequestDetailModel, condition, data);
    return response;
  },
  findWithCondition: async (condition) => {
    const response = await RequestDetailModel.find(condition);
    return response;
  },
};

module.exports = requestDetailDaos;
