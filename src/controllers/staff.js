const { StaffDaos } = require('../daos');
const asyncMiddleware = require('../middleware/async-middleware');
const convertResponse = require('../utils/response-helper')

/**
 * @typedef {'getListStaffs'} RequestController
 * @type {Record<RequestController, import('express').RequestHandler>}
 */
const staff = {
  getListStaffs: async (req, res, next) => {
    const { tab, size, ...filters } = req.query;
    Object.keys(filters).forEach((key) => {
      if (!['age', 'rating_avg', 'gender'].includes(key)) delete filters[key];
    });
    const staffs = await StaffDaos.getListStaffs(tab, size, filters);

    convertResponse(null, 'Get list staffs successfully', staff, res)
  },
};
module.exports = {
  getListStaffs: asyncMiddleware(staff.getListStaffs),
};
