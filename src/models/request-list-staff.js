const mongoose = require('mongoose');

const RequestListStaff = mongoose.Schema(
  {
    request_id: {
      type: mongoose.Types.ObjectId,
      ref: 'Request',
    },
    user_id: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    staff_ids: [
      {
        type: mongoose.Types.ObjectId,
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
