const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');

const baseDaos = {
  //add genaric type T in insertData function
  /**
   * @template {import('mongoose').Model} T
   * @param {T} model
   */
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
  findById: async (model, id) => {
    try {
      const findOneResponse = await model.findById(id);
      return findOneResponse;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
  updateOne: async (model, condition, data) => {
    try {
      const findOneResponse = await model.updateOne(condition, data);
      return findOneResponse;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Error');
    }
  },
};

module.exports = baseDaos;
