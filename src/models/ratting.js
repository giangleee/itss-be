const mongoose = require('mongoose');

const Ratting = mongoose.Schema(
  {
    staff_id: {
      type: String,
      ref: 'Staff',
    },
    user_id: {
      type: String,
      ref: 'User',
    },
    request_detail_id: {
      type: String,
      ref: 'RequestDetail',
    },
    ratting: {
      type: Number,
      require: true,
    },
    comment: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = mongoose.model('Ratting', Ratting);
