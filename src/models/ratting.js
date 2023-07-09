const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const rattingSchema = new Schema(
  {
    staff_id: {
      type: Schema.Types.ObjectId,
      ref: 'Staff',
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    request_id: {
      type: Schema.Types.ObjectId,
      ref: 'Request',
    },
    ratting: {
      type: Number,
      required: true,
    },
    comment: String,
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Ratting = model('Ratting', rattingSchema);

module.exports = Ratting;
