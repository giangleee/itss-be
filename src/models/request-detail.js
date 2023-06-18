const mongoose = require('mongoose');

const STATUS_CODE = {
  IS_ON_HOLD: 0,
  IS_RUNNING: 1,
  IS_COMPLETED: 2,
  IS_EXPIRED: 3,
};

const RequestDetail = mongoose.Schema(
  {
    staff_id: {
      type: String,
      ref: 'Staff',
    },
    user_id: {
      type: String,
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
      enum: Object.values(STATUS_CODE),
      default: STATUS_CODE.IS_ON_HOLD,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('RequestDetail', RequestDetail);
