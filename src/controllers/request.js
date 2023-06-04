const express = require('express');
const { RequestDetailModel, RequestModel } = require('../models');
/**
 * @typedef {{job:'sitters'| 'cooker'| 'both';request_detail:{work_time:string;salary:number;policy:string;other_note?:string}}} Body
 */
/**
 * @type {Record<string, express.RequestHandler>}
 */
const request = {
  /**
   * Create a new request
   * @param {express.Request<Record<string,string>,any,Body,any>} req
   */
  createOne: async (req, res, next) => {
    try {
      const { job, request_detail } = req.body;
      // TODO: Fake user id
      const user_id = '5f9d7b3b3f0b7c2b1c3b3b3b';
      const requestDetail = await RequestDetailModel.create({
        ...request_detail,
        user_id,
      });
      const jobValue = job === 'sitters' ? 0 : job === 'cooker' ? 1 : 2;
      const request = await RequestModel.create({
        job: jobValue,
        request_detail_id: requestDetail._id,
      });
      res.status(203).json({ message: 'Create request successfully', data: request });
    } catch (error) {
      next(error);
    }
  },
};
module.exports = request;
