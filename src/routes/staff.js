const express = require('express');
const router = express.Router();
const { staffController } = require('../controllers');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.get('/list-staff', staffController.getListStaffs);
  return router;
};

module.exports = initRouter(router);
