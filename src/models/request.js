const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;
const { JOB_TYPE } = require('../utils/constants');

const requestSchema = new mongoose.Schema(
  {
    request_detail_id: {
      type: ObjectId,
      required: true,
      ref: 'RequestDetail',
    },
    job: {
      type: Number,
      required: true,
      enum: Object.values(JOB_TYPE),
      default: JOB_TYPE.SITTER,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;
