const CustomError = require('./CustomErrors')

class CustomApiMessage extends CustomError {
    constructor(code, data, message) {
        super(code, {data, message})
    }
}

module.exports = CustomApiMessage
