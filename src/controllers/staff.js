const { RequestDaos, RequestDetailDaos, RequestListStaffDaos, StaffDaos } = require('../daos');
const httpCode = require('../utils/http-codes');

/**
 * @typedef {'getListStaffs'} RequestController
 * @type {Record<RequestController, import('express').RequestHandler>}
 */
const staff = {
  getListStaffs: async (req, res, next) => {
    try {
      const { tab, size, ...filters } = req.query;
      Object.keys(filters).forEach((key) => {
        if (!['age', 'rating_avg', 'gender'].includes(key)) delete filters[key];
      });
      const staffs = await StaffDaos.getListStaffs(tab, size, filters);
      res.status(httpCode.SUCCESS).json({ message: 'Get list staffs successfully', data: staffs });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = staff;
