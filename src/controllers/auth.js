const { UserDaos } = require('../daos');
const { UserService } = require('../services');
const httpCode = require('../utils/http-codes');
const asyncMiddleware = require('../middleware/async-middleware');
const convertResponse = require('../utils/response-helper');
const _ = require('lodash');

const auth = {
  login: async (request, response) => {
    const { email, password } = request.body;
    const result = await UserService.getUserDataByCondition({email})
    await UserService.comparePassword(password, result.userData.password)

    convertResponse(httpCode.SUCCESS, 'Login successfully', result?.jsonToken, response);
  },

  register: async (request, response) => {
    const { email, password } = request.body;
    await UserService.checkValidEmail(email);

    const result = await UserService.createUser({ email, password });
    convertResponse(httpCode.CREATED_SUCCESS, 'Register successfully', result, response);
  },

  getUser: async (request, response) => {
    const { token } = request.query;
    const result = await UserService.decodeUserToken(token);

    convertResponse(httpCode.SUCCESS, 'Get user data successfully', result, response);
  },

  updateUser: async (request, response) => {
    const { _id } = request.params;
    const result = await UserService.updateUserData({ _id, ...request.body})

    convertResponse(httpCode.SUCCESS, 'Update user successfully', result, response);
  },
};

module.exports = {
  login: asyncMiddleware(auth.login),
  register: asyncMiddleware(auth.register),
  getUser: asyncMiddleware(auth.getUser),
  updateUser: asyncMiddleware(auth.updateUser),
};
