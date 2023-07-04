const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const GENDER = {
  MAN: 'Male',
  WOMAN: 'Female',
  NONE_OF_THEM_ABOVE: 'Other',
};

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullName: String,
    cccd: String,
    gender: {
      type: String,
      enum: Object.values(GENDER),
    },
    dateOfBirth: Date,
    avatar: {
      type: String,
      default:
        'https://yt3.googleusercontent.com/ytc/AGIKgqNEz6zvmf7H6vVA5eBWARRTcnXUUP01djNEcEyMNw=s900-c-k-c0x00ffffff-no-rj',
    },
    address: String,
    phoneNumber: String,
    province: String,
    district: String,
    role_id: {
      type: Schema.Types.ObjectId,
      ref: 'Role',
    },
    lang_id: {
      type: Schema.Types.ObjectId,
      ref: 'Language',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const User = model('User', userSchema);

module.exports = User;
