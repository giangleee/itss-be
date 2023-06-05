const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  authValidation: { login, register },
} = require('../validations');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.post('/login', validate(login()), authController.login);
  router.post('/register', validate(register()), authController.register);
  return router;
};

module.exports = initRouter(router);
