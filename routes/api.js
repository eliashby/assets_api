const express = require('express');
const cors = require('cors');
const auth = require('../modules/auth');
const websiteActions = require('../modules/website_actions');
const { checkSchema } = require('express-validator/check');
const validationSchemas = require('../validation/validationSchemas');
const acceptedData = require('../validation/accepted_data');

const router = express.Router();

'use strict';

// Middleware for authenticating token. Will authenticate for any route after /api/beta
router.use('/', (req, res, next) => {
  auth(req, res, next);
});

router.route('/websites', cors())

  .get((req, res) => {
    websiteActions.get(req, res);
  })

  .post(checkSchema(validationSchemas.saveNew), (req, res) => {
    const errors = req.validationErrors();

    if (errors) {
      res.status(500).json(errors);
    } else {
      websiteActions.save(req, res);
    }
  })

  .patch((req, res) => {
    websiteActions.update(req, res);
  });

router.get('/accepted-data', cors(), (req, res) => {
  const respData = {
    status: 'success',
    data: acceptedData,
  };
  res.json(respData);
});

module.exports = router;
