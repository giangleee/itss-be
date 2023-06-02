const { Schema, model } = require('mongoose')

const Language = Schema(
    {
        name: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = model('Language', Language);
