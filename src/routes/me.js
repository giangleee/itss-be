const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middleware');
const { UserModel } = require('../models');
/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.get('/', authMiddleware.veryfiToken, async (req, res) => {
    const user = await UserModel.findById(req.payload._id);
    res.status(200).json({ data: user });
  });

  return router;
};

module.exports = initRouter(router);
