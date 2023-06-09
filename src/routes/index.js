const express = require('express');
const router = express.Router();
const requestRouter = require('./request');
const staffRouter = require('./staff');
const authRouter = require('./auth');
const { errorHandler } = require('../middleware');
const rattingRouter = require('./ratting')

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.use('/request', requestRouter);
  router.use('/staff', staffRouter);
  router.use('/auth', authRouter);
  router.use('/ratting', rattingRouter)
  router.use(errorHandler);
  return router;
};

module.exports = initRouter(router);
