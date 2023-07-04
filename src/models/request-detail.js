const mongoose = require('mongoose');
const { Schema, model } = mongoose;
const constants = require('../utils/constants');

const requestDetailSchema = new Schema(
  {
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    work_time: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
    policy: {
      type: String,
      required: true,
    },
    other_note: String,
    status: {
      type: Number,
      required: true,
      enum: Object.values(constants.STATUS_CODE),
      default: constants.STATUS_CODE.IS_ON_HOLD,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RequestDetail = model('RequestDetail', requestDetailSchema);

module.exports = RequestDetail;
