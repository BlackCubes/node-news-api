const express = require('express');
const { newsapiController } = require('../controllers');

const router = express.Router();

router
  .route('/top-headlines')
  .get(newsapiController.confirmApikey, newsapiController.getTopHeadlines)
  .post(newsapiController.confirmApikey, newsapiController.postTopHeadlines);

router
  .route('/everything')
  .get(newsapiController.confirmApikey, newsapiController.getEverything)
  .post(newsapiController.confirmApikey, newsapiController.postEverything);

router
  .route('/sources')
  .post(newsapiController.confirmApikey, newsapiController.postSources);

module.exports = router;
