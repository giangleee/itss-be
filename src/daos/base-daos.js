const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');

const baseDaos = {
  insertData: async (model, data) => {
    try {
      const insertResponse = await model.create(data);
      return insertResponse;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
  findOne: async (model, data) => {
    try {
      const findOneResponse = await model.findOne(data);
      return findOneResponse;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
};

module.exports = baseDaos;
