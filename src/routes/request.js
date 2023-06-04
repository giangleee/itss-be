const express = require('express');
const router = express.Router();
const { request: requestController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  requestValidation: { createOnerequest, getListApplyStaff },
} = require('../validations');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.post('/', validate(createOnerequest()), requestController.createOne);
  router.get(
    '/list-apply-staff/:request_id',
    validate(getListApplyStaff()),
    requestController.getListApplyStaff,
  );
  return router;
};

module.exports = initRouter(router);
