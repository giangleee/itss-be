const express = require('express');
const router = express.Router();
const { requestController } = require('../controllers');
const { validate } = require('../middleware');
const {
  requestValidation: {
    createOneRequest,
    getListApplyStaff,
    removeStaffFromRequestListStaff,
    acceptStaffFromRequestListStaff,
    getRequestBaseUserInfo,
  },
} = require('../validations');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.post('/', validate(createOneRequest()), requestController.createOne);
  router.post(
    '/:request_id/accept/:staff_id',
    validate(acceptStaffFromRequestListStaff()),
    requestController.acceptStaffFromRequestListStaff,
  );
  router.get(
    '/list-apply-staff/:request_id',
    validate(getListApplyStaff()),
    requestController.getListApplyStaff,
  );
  router.patch(
    '/list-apply-staff/:request_id',
    validate(removeStaffFromRequestListStaff()),
    requestController.removeStaffFromRequestListStaff,
  );
  router.get('/list-progess', requestController.getListProgessRequest);
  router.get('/', validate(getRequestBaseUserInfo()), requestController.getListRequestBaseUser);

  return router;
};

module.exports = initRouter(router);
