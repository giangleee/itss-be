const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const ratingSchema = new Schema(
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
    rating: {
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

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
