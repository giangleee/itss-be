const { RattingDaos } = require('../daos')

const ratingService = {
    getRatingDetail: async (staff_id) => {
        const result = await RattingDaos.getRatingDetail(staff_id)
        return result
    }
}

module.exports = ratingService
