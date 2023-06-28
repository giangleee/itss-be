const { UserDaos } = require('../daos');
const { UserService } = require('../services');
const httpCode = require('../utils/http-codes');
const asyncMiddleware = require('../middleware/async-middleware')
const convertResponse = require('../utils/response-helper')


/**
 * @typedef {'login'|'register'} AuthController
 * @type {Record<AuthController, import('express').RequestHandler>}
 */
const auth = {
  login: async (req, res, next) => {
    const { email, password } = req.body;
    const user = await UserDaos.findOne({ email });
    if (!user) throw 'User not found';

    const isMatch = UserService.comparePassword(password, user.password);
    if (!isMatch) throw 'Wrong password';

    const token = UserService.genToken(user._id);

    convertResponse(null, 'Login successfully', token, res)
  },

  register: async (req, res, next) => {
    const email = req.body.email;
    const result = await UserDaos.findOne({ email });
    if (result) throw 'Email already exists';

    const user = await UserDaos.createUser(req.body);

    convertResponse(httpCode.CREATED_SUCCESS, 'Register successfully', user, res)
  },
};

module.exports = {
  login: asyncMiddleware(auth.login),
  register: asyncMiddleware(auth.register),
};
