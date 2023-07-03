const jwt = require('jsonwebtoken');
const _ = require('lodash');
const { UserDaos } = require('../daos');
const httpCodes = require('../utils/http-codes');
const customApiMessage = require('../errors/CustomApiMessage');
const bcrypt = require('bcrypt');
const { SALT_ROUNDS } = require('../utils/constants');
const { ObjectId } = require('mongoose').Types;

const userService = {
  comparePassword: async (password, userPassword) => {
    const passwordCompare = await bcrypt.compare(password, userPassword);
    if (!passwordCompare) throw new customApiMessage(httpCodes.UNPROCESSABLE_ENTITY, {}, 'User or password wrong');
  },
  genToken: (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, {
      expiresIn: '7d',
    });
  },
  checkValidEmail: async (email) => {
    const result = await UserDaos.findOne({ email });
    if (!_.isNil(result))
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Email already exists');
  },
  createUser: async ({ email, password }) => {
    const result = await UserDaos.createUser({ email, password: await hashPassword(password) });
    const jsonToken = await generateAccessToken(result._id);

    return { userData: result, jsonToken: jsonToken };
  },
  decodeUserToken: async (token) => {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
    const userData = await UserDaos.findOne({ _id: new ObjectId(decodedToken.userId) });
    return userData;
  },
  updateUserData: async ({_id, ...payload}) => {
    const userData = await UserDaos.findOne({ _id: new ObjectId(_id) });
    if (_.isNil(userData))
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Invalid user id');

    await UserDaos.updateOne({ _id }, { $set: payload })

    return await UserDaos.findOne({ _id: new ObjectId(_id) });
  },
  getUserDataByCondition: async (condition) => {
    const userData = await UserDaos.findOne(condition)
    if (_.isNil(userData))
      throw new customApiMessage(httpCodes.BAD_REQUEST, {}, 'Email is invalid')

      const jsonToken = await generateAccessToken(userData._id);
    return { userData: userData, jsonToken: jsonToken }
  }
};

const hashPassword = async (password) => {
  return await bcrypt.hash(password, SALT_ROUNDS);
};

const generateAccessToken = async (userId) => {
  const accessToken = await jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: process.env.JWT_EXPIRES_TIME,
  });

  const { exp: expiresIn } = await jwt.verify(accessToken, process.env.JWT_SECRET_KEY);
  return { token: accessToken, expiresIn: expiresIn };
};

module.exports = userService;
