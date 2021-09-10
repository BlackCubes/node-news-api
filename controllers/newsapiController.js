const NewsAPI = require('newsapi');
const { AppError, catchAsync, filterObj, sanitize } = require('../utils');

exports.confirmApikey = (req, res, next) => {
  const { apiKey } =
    req.method === 'POST' ? sanitize(req.body) : sanitize(req.query);

  if (!apiKey) {
    return next(
      new AppError('Please provide an API key for the NewsAPI.', 400)
    );
  }

  next();
};

// TOP-HEADLINES
// -- GET method
exports.getTopHeadlines = catchAsync(async (req, res, next) => {
  const { apiKey } = sanitize(req.query);
  const filteredQuery = sanitize(filterObj(req.query, 'apiKey'));

  const newsapi = new NewsAPI(apiKey);

  try {
    const data = await newsapi.v2.topHeadlines(filteredQuery);

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

// -- POST method
exports.postTopHeadlines = catchAsync(async (req, res, next) => {
  const { apiKey } = sanitize(req.body);
  const filteredBody = sanitize(filterObj(req.body, 'apiKey'));

  const newsapi = new NewsAPI(apiKey);

  try {
    const data = await newsapi.v2.topHeadlines(filteredBody);

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

// EVERYTHING
// -- GET method
exports.getEverything = catchAsync(async (req, res, next) => {
  const { apiKey } = sanitize(req.query);
  const filteredQuery = sanitize(filterObj(req.query, 'apiKey'));

  const newsapi = new NewsAPI(apiKey);

  try {
    const data = await newsapi.v2.everything(filteredQuery);

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

// -- POST method
exports.postEverything = catchAsync(async (req, res, next) => {
  const { apiKey } = sanitize(req.body);
  const filteredBody = sanitize(filterObj(req.body, 'apiKey'));

  const newsapi = new NewsAPI(apiKey);

  try {
    const data = await newsapi.v2.everything(filteredBody);

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});

// SOURCES
// -- POST method
exports.postSources = catchAsync(async (req, res, next) => {
  const { apiKey } = sanitize(req.body);
  const filteredBody = sanitize(filterObj(req.body, 'apiKey'));

  const newsapi = new NewsAPI(apiKey);

  try {
    const data = await newsapi.v2.sources(filteredBody);

    res.status(200).json({
      ...data,
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
});
