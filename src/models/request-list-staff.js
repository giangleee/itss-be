const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const requestListStaffSchema = new Schema(
  {
    request_id: {
      type: Schema.Types.ObjectId,
      ref: 'Request',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    staff_ids: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const RequestListStaff = model('RequestListStaff', requestListStaffSchema);

module.exports = RequestListStaff;
