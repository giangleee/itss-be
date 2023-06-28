const { Schema, model } = require('mongoose');
const { GENDER, JOB_TYPE } = require('../utils/constants');

const Staff = Schema(
  {
    rating_avg: {
      type: Number,
    },
    cccd: {
      type: String,
      require: true,
    },
    gender: {
      type: String,
      require: true,
      enum: Object.values(GENDER),
    },
    date_of_birth: {
      type: Date,
      require: true,
    },
    avatar: {
      type: String,
    },
    address: {
      type: String,
      require: true,
    },
    fullname: {
      type: String,
      require: true,
    },
    facebook: {
      type: String,
    },
    phone_number: {
      type: String,
      require: true,
      unique: true,
    },
    twitter: String,
    zalo: String,
    company_exp: {
      type: Number,
      require: true,
    },
    total_exp: {
      type: Number,
      require: true,
    },
    skill: {
      type: String,
      require: true,
    },
    city: {
      type: String,
      require: true,
    },
    district: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    job: {
      type: String,
      require: true,
      enum: Object.values(JOB_TYPE),
    },
    intro: {
      type: String,
    },
    email: {
      type: String,
      require: true,
    }
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model('Staff', Staff);
