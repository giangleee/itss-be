const mongoose = require('mongoose');

const RequestListStaff = mongoose.Schema(
  {
    request_id: {
      type: String,
      ref: 'Request',
    },
    user_id: {
      type: String,
      ref: 'User',
    },
    staff_ids: [
      {
        type: String,
        ref: 'User',
      },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('RequestListStaff', RequestListStaff);
