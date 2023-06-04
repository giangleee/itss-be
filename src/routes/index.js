const express = require('express');
const router = express.Router();
const requestRouter = require('./request');
const staffRouter = require('./staff');
const authRouter = require('./auth');
const { errorHandler } = require('../middlewares');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.use('/request', requestRouter);
  router.use('/staff', staffRouter);
  router.use('/auth', authRouter);
  router.use(errorHandler);
  return router;
};

module.exports = initRouter(router);
