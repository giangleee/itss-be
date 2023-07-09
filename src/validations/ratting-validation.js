const { body, param, query } = require('express-validator')

const rattingValidation = {
    createRatting: () => [
        body('user_id', 'Invalid user data').isString(),
        body('user_id', 'User Id is required').notEmpty(),
        body('staff_id', 'Invalid staff data').isString(),
        body('staff_id', 'Staff Id is required').notEmpty(),
        body('request_id', 'Invalid staff data').isString(),
        body('request_id', 'Staff Id is required').notEmpty(),
        body('data', 'Ratting data is required').notEmpty(),
        body('data.ratting', 'Invalid ratting data type').isInt(),
        body('data.ratting', 'Ratting data is required').notEmpty(),
        body('data.comment', 'Invalid comment data type').isString(),
        body('data.comment', 'Comment data is required').notEmpty(),
    ],

    getRatingDetail: () => [
        query('staff_id', 'Invalid user data').isMongoId(),
        query('staff_id', 'User Id is required').notEmpty(),
    ]
}

module.exports = rattingValidation
