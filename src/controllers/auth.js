const { UserDaos } = require('../daos');
const { UserService } = require('../services');
const httpCode = require('../utils/http-codes');
const asyncMiddleware = require('../middlewares/async-middleware')

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

    res.status(httpCode.SUCCESS).json({ message: 'Login successfully', data: { token } });
  },

  register: async (req, res, next) => {
    //emailpasswordfullnamecccdgenderdate_of_birthavataraddressrole_idlang_idcreate_atphone_numbertoken
    const email = req.body.email;
    const result = await UserDaos.findOne({ email });
    if (result) throw 'Email already exists';

    const user = await UserDaos.createUser(req.body);
    res.status(httpCode.CREATED_SUCCESS).json({ message: 'Register successfully', data: user });
  },
};

module.exports = {
  login: asyncMiddleware(auth.login),
  register: asyncMiddleware(auth.register),
};
