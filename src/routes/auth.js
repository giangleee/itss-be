const express = require('express');
const router = express.Router();
const { authController } = require('../controllers');
const { validate } = require('../middleware');
const {
  authValidation: { login, register, updateUser },
} = require('../validations');

const initRouter = (router) => {
  router.post('/login', validate(login()), authController.login);
  router.post('/register', validate(register()), authController.register);
  router.get('/', authController.getUser);
  router.patch('/:_id', validate(updateUser()), authController.updateUser);
  router.get('/check-valid-email', authController.checkValidEmail);
  router.post('/signup', authController.signup);
  return router;
};

module.exports = initRouter(router);
