const { UserModel } = require('../models');
/**
 * @typedef {'login'|'register'} AuthController
 * @type {Record<AuthController, import('express').RequestHandler>}
 */
const auth = {
  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UserModel.findOne({ email });
      if (!user) throw 'User not found';
      const isMatch = await user.comparePassword(password);
      if (!isMatch) throw 'Wrong password';
      const token = user.genToken();
      res.json({ message: 'Login successfully', data: { token } });
    } catch (error) {
      next(error);
    }
  },
  register: async (req, res, next) => {
    //emailpasswordfullnamecccdgenderdate_of_birthavataraddressrole_idlang_idcreate_atphone_numbertoken
    try {
      const email = req.body.email;
      const result = await UserModel.findOne({ email });
      if (result) throw 'Email already exists';
      const user = await UserModel.create(req.body);
      res.status(201).json({ message: 'Register successfully', data: user });
    } catch (error) {
      next(error);
    }
  },
};

module.exports = auth;
