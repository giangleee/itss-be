const { Schema, model } = require('mongoose')

const Role = Schema(
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

module.exports = model('Role', Role);
