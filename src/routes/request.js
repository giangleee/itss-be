const express = require('express');
const router = express.Router();
const { requestController } = require('../controllers');
const { validate } = require('../middlewares');
const {
  requestValidation: {
    createOnerequest,
    getListApplyStaff,
    removeStaffFromRequestListStaff,
    acceptStaffFromRequestListStaff,
  },
} = require('../validations');

/**
 * This function is used to initialize all routes
 * @param {express.Router} router
 * @returns {express.Router}
 */
const initRouter = (router) => {
  router.post('/', validate(createOnerequest()), requestController.createOne);
  router.post(
    '/:request_id/accept/:staff_id',
    validate(acceptStaffFromRequestListStaff()),
    requestController.acceptStaffFromRequestListStaff,
  );
  router
    .route('/list-apply-staff/:request_id')
    .get(validate(getListApplyStaff()), requestController.getListApplyStaff)
    .patch(
      validate(removeStaffFromRequestListStaff()),
      requestController.removeStaffFromRequestListStaff,
    );
  router.get('/list-progess', requestController.getListProgessRequest);
  return router;
};

module.exports = initRouter(router);
