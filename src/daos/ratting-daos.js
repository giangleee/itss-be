const { RattingModel } = require('../models');
const _ = require('lodash');
const customApiMessage = require('../errors/CustomApiMessage');
const baseDaos = require('./base-daos');
const { ObjectId } = require('mongoose').Types;
const httpCode = require('../utils/http-codes');

const rattingDaos = {
  getRatingDetail: async (staff_id) => {
    if (ObjectId.isValid(staff_id)) {
      const condition = [
        {
          $match: {
            staff_id: new ObjectId(staff_id),
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
            from: 'users',
            localField: 'user_id',
            foreignField: '_id',
            as: 'user_detail',
          },
        },
        {
          $unwind: '$user_detail',
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
          $project: {
            _id: 1,
            ratting: 1,
            comment: 1,
            staff_detail: 1,
            user_detail: 1,
            request_detail: 1,
          },
        },
      ];
      const ratingDetail = await baseDaos.findByAggregation(RattingModel, condition);
      return ratingDetail;
    }
    throw new customApiMessage(httpCode.INTERNAL_SERVER_ERROR, {}, 'Invalid id');
  },
  insertRatting: async (payload) => {
    const result = await baseDaos.insertData(RattingModel, payload);
    return result;
  },
  getListRatingByStaffId: async (staff_id) => {
    const condition = [
      {
        $match: {
          staff_id: new ObjectId(staff_id),
        },
      },
      {
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user_detail',
        },
      },
    ]
    const result = await baseDaos.findByAggregation(RattingModel, condition)
    return result
  },
};

module.exports = rattingDaos;
