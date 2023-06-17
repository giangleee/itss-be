const {query} = require('express-validator')

const staffValidation = {
    getStaff: () => [
        query('_id').isString().withMessage('Invalid value')
    ]
}

module.exports = staffValidation
