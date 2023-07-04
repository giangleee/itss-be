const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const languageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Language = model('Language', languageSchema);

module.exports = Language;
