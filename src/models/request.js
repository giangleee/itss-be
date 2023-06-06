const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const JOB_TYPE = {
  SITTER: 0,
  COOKER: 1,
  BOTH: 2,
};

const Request = Schema(
  {
    request_detail_id: {
      type: String,
      require: true,
      ref: 'RequestDetail',
    },
    job: {
      type: Number,
      require: true,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.SITTER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);
module.exports = model('Request', Request);
