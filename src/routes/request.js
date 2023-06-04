const express = require('express');
const router = express.Router();
const { request: requestController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  requestValidation: { createOnerequest },
} = require('../validations');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.post('/', validate(createOnerequest()), requestController.createOne);
  return router;
};

module.exports = initRouter(router);
