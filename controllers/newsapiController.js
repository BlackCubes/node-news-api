const NewsAPI = require('newsapi');
const { AppError, catchAsync, filterObj, sanitize } = require('../utils');

exports.confirmApikey = (req, res, next) => {
  const { apiKey } = sanitize(req.body);

  if (!apiKey) {
    return next(
      new AppError('Please provide an API key for the NewsAPI.', 400)
    );
  }

  next();
};

exports.topHeadlines = catchAsync(async (req, res, next) => {
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

exports.everything = catchAsync(async (req, res, next) => {
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

exports.sources = catchAsync(async (req, res, next) => {
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
