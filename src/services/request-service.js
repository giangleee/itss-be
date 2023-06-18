const CustomApiMessage = require('../errors/CustomApiMessage');
const { ObjectId } = require('mongoose').Types;
const httpCode = require('../utils/http-codes');
const { RequestListStaffModel, RequestModel } = require('../models');

const requestService = {
  checkValidObjectId: async (user_id) => {
    if (!ObjectId.isValid(user_id))
      throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Invalid id data');
  },
  getRequestByUserId: async (user_id) => {
    const result = await RequestListStaffModel.aggregate([
      {
        $match: {
          user_id: new ObjectId(user_id),
        },
      },
      {
        $lookup: {
          from: 'staffs',
          localField: 'staff_id',
          foreignField: '_id',
          as: 'staff_detail',
        },
      },
      {
        $unwind: '$staff_detail',
      },
      {
        $lookup: {
          from: 'requests',
          localField: 'request_id',
          foreignField: '_id',
          as: 'request_detail',
        },
      },
      {
        $unwind: '$request_detail',
      },
      {
        $lookup: {
          from: 'requestdetails',
          localField: 'request_detail.request_detail_id',
          foreignField: '_id',
          as: 'request_detail.request_detail_data',
        },
      },
      {
        $unwind: '$request_detail.request_detail_data',
      },
      {
        $project: {
          _id: 1,
          staff_detail: 1,
          request_detail: 1,
        },
      },
    ]);
    if (result.length === 0)
        throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Can not find')
    return result
  },
  getRequestDetail: async (request_id) => {
    const result = await RequestModel.aggregate([
      {
        $match: {
          _id: new ObjectId(request_id)
        }
      },
      {
        $lookup: {
          from: 'requestdetails',
          localField: 'request_detail_id',
          foreignField: '_id',
          as: 'request_detail'
        }
      },
      {
        $unwind: '$request_detail'
      },
      {
        $project: {
          _id: 1,
          request_detail: 1,
          job: 1,
        }
      }
    ])
    if (result.length === 0)
      throw new CustomApiMessage(httpCode.BAD_REQUEST, {}, 'Can not find');
    return result
  }
};

module.exports = requestService;
