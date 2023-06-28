const mongoose = require('mongoose');
const constants = require('../utils/constants')

const RequestDetail = mongoose.Schema(
  {
    staff_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Staff',
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    work_time: {
      type: String,
      require: true,
    },
    salary: {
      type: Number,
      require: true,
    },
    policy: {
      type: String,
      require: true,
    },
    term: {
      type: String,
      require: true,
    },
    other_note: String,
    status: {
      type: Number,
      require: true,
      enum: Object.values(constants.STATUS_CODE),
      default: constants.STATUS_CODE.IS_ON_HOLD,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('RequestDetail', RequestDetail);
