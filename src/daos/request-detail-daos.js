const { RequestDetailModel } = require('../models');
const baseDaos = require('./base-daos');

const requestDetailDaos = {
    createRequestDetail: async (data) => {
        const response = await baseDaos.insertData(RequestDetailModel, data)
        return response
    },
}

module.exports = requestDetailDaos
