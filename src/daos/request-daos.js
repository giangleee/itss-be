const { RequestModel } = require('../models');
const baseDaos = require('./base-daos');

const requestDaos = {
    createRequest: async (data) => {
        const response = await baseDaos.insertData(RequestModel, data)
        return response
    },
}

module.exports = requestDaos
