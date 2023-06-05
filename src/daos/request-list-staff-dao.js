const { RequestListStaffModel } = require('../models');
const baseDaos = require('./base-daos');

const requestListStaffDaos = {
    findOne: async (data) => {
        const response = await baseDaos.findOne(RequestListStaffModel, data)
        return response
    },
}

module.exports = requestListStaffDaos
