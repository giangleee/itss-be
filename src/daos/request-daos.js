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
};

module.exports = requestDaos;
