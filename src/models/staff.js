const { Schema, model } = require('mongoose');
const { GENDER, JOB_TYPE } = require('../utils/constants');

const staffSchema = new Schema(
  {
    rating_avg: {
      type: Number,
    },
    cccd: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      required: true,
      enum: Object.values(GENDER),
    },
    date_of_birth: {
      type: Date,
      required: true,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    facebook: {
      type: String,
    },
    phone_number: {
      type: String,
      required: true,
      unique: true,
    },
    twitter: String,
    zalo: String,
    company_exp: {
      type: Number,
      required: true,
    },
    total_exp: {
      type: Number,
      required: true,
    },
    skill: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    district: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    job: {
      type: String,
      required: true,
      enum: Object.values(JOB_TYPE),
    },
    intro: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Staff = model('Staff', staffSchema);

module.exports = Staff;
