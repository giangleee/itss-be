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
      console.log('data', data);
      const insertResponse = await model.create(data);
      return insertResponse;
    } catch (error) {
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, error);
    }
  },
  findOne: async (model, data) => {
    try {
      const findOneResponse = await model.findOne(data).sort({createdAt: -1});
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
  findByCondition: async (model, condition) => {
    try {
      const findOneResponse = await model.find(condition);
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
  findByAggregation: async (model, condition) => {
    const result = await model.aggregate(condition);
    if (result.length === 0)
        throw new customApiMessage(httpCodes.UNPROCESSABLE_ENTITY, {}, 'Can not find');
    return result
  }
};

module.exports = baseDaos;
