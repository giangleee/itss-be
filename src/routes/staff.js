const express = require('express');
const router = express.Router();
const { staffController } = require('../controllers');
const {staffValidation} = require('../validations')
const {validate} = require('../middleware')

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.get('/list-staff', staffController.getListStaffs);
  router.get('/', validate(staffValidation.getStaff()), staffController.getStaff)
  router.get('/rate', validate(staffValidation.getStaff()), staffController.getStaffRatingInfo)

  return router;
};

module.exports = initRouter(router);
