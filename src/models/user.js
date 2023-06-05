const { Schema, model } = require('mongoose');
const { ObjectId } = require('mongoose').Types;

const GENDER = {
  MAN: 0,
  WOMAN: 1,
  NONE_OF_THEM_ABOVE: 2,
};

const User = Schema(
  {
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    fullName: {
      type: String,
      require: true,
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
    dateOfBirth: {
      type: Date,
      require: true,
    },
    avatar: {
      type: String,
      require: true,
      default: 'img_default',
    },
    address: {
      type: String,
      require: true,
    },
    phoneNumber: {
      type: String,
      require: true,
      unique: true,
    },
    token: {
      type: String,
      require: true,
      unique: true,
    },
    role_id: {
      type: ObjectId,
      ref: 'Role',
    },
    lang_id: {
      type: ObjectId,
      ref: 'Language',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

module.exports = model('User', User);
