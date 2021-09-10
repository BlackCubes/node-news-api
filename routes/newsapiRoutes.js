const express = require('express');
const { newsapiController } = require('../controllers');

const router = express.Router();

router
  .route('/top-headlines')
  .post(newsapiController.confirmApikey, newsapiController.postTopHeadlines);

router
  .route('/everything')
  .post(newsapiController.confirmApikey, newsapiController.postEverything);

router
  .route('/sources')
  .post(newsapiController.confirmApikey, newsapiController.postSources);

module.exports = router;
