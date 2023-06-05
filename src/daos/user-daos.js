const { UserModel } = require('../models');
const baseDaos = require('./base-daos');

const userDaos = {
    findOne: async (data) => {
        const response = await baseDaos.findOne(UserModel, data)
        return response
    },
    createUser: async (data) => {
        const response = await baseDaos.insertData(UserModel, data)
        return response
    },
}

module.exports = userDaos
