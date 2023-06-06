const { RequestModel } = require('../models');
const baseDaos = require('./base-daos');

const requestDaos = {
  createRequest: async (data) => {
    const response = await baseDaos.insertData(RequestModel, data);
    return response;
  },
  findById: async (id) => {
    const response = await baseDaos.findById(RequestModel, id);
    return response;
  },
  findWidthCondition: async (condition) => {
    const response = await RequestModel.find(condition);
    return response;
  },
  findOne: async (condition) => {
    const response = await baseDaos.findOne(RequestModel, condition);
    return response;
  },
};

module.exports = requestDaos;
