const { Schema, model } = require('mongoose')

const GENDER = {
    MAN: 0,
    WOMAN: 1,
    NONE_OF_THEM_ABOVE: 2
}

const Staff = Schema(
    {
        rating_avg: {
            type: Number,
            unique: true
        },
        cccd: {
            type: String,
            require: true,
        },
        gender: {
            type: String,
            require: true,
            enum: Object.values(GENDER)
        },
        dateOfBirth: {
            type: Date,
            require: true,
        },
        avatar: {
            type: String,
            require: true,
            default: 'img_default'
        },
        address: {
            type: String,
            require: true,
        },
        fullName: {
            type: String,
            require: true,
        },
        facebook: {
            type: String,
        },
        phoneNumber: {
            type: String,
            require: true,
            unique: true
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
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

module.exports = model('Staff', Staff);
