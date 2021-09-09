const express = require('express');
const { newsapiController } = require('../controllers');

const router = express.Router();

router.post(
  '/top-headlines',
  newsapiController.confirmApikey,
  newsapiController.topHeadlines
);

router.post(
  '/everything',
  newsapiController.confirmApikey,
  newsapiController.everything
);

router.post(
  '/sources',
  newsapiController.confirmApikey,
  newsapiController.sources
);

module.exports = router;
