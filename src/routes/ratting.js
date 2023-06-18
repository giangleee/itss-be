const express = require('express');
const router = express.Router();
const { rattingController } = require('../controllers');
const { rattingValidation } = require('../validations');
const { validate } = require('../middleware');

const initRouter = (router) => {
  router.post(
    '/create',
    validate(rattingValidation.createRatting()),
    rattingController.createRatting,
  );

  return router;
};

module.exports = initRouter(router);
