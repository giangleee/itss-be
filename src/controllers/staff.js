const { StaffDaos } = require('../daos');
const asyncMiddleware = require('../middleware/async-middleware');
const convertResponse = require('../utils/response-helper');
const { ratingService } = require('../services')

/**
 * @typedef {'getListStaffs'} RequestController
 * @type {Record<RequestController, import('express').RequestHandler>}
 */
const staff = {
  getListStaffs: async (req, res) => {
    const { tab, size, ...filters } = req.query;
    Object.keys(filters).forEach((key) => {
      if (!['age', 'rating_avg', 'gender'].includes(key)) delete filters[key];
    });
    const staffs = await StaffDaos.getListStaffs(tab, size, filters);

    convertResponse(null, 'Get list staffs successfully', staffs, res)
  },
  getStaff: async (request, response) => {
    const { _id } = request.query
    const result = await StaffDaos.getStaff(_id)

    convertResponse(null, 'Get staff successfully', result, response)
  },
  getStaffRatingInfo: async (request, response) => {
    const { _id } = request.query
    const result = await StaffDaos.getStaff(_id)
    const ratingDetail = await ratingService.getRatingDetail(_id)

    convertResponse(null, 'Get Staff Rating successfully', ratingDetail, response)
  }
};
module.exports = {
  getListStaffs: asyncMiddleware(staff.getListStaffs),
  getStaff: asyncMiddleware(staff.getStaff),
  getStaffRatingInfo: asyncMiddleware(staff.getStaffRatingInfo)
};
