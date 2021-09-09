const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const xss = require('xss-clean');
const compression = require('compression');

const { AppError } = require('./utils');
const { globalErrorHandler } = require('./controllers');

const app = express();

// Proxy
app.enable('trust proxy');

// Implement CORS
app.use(cors());
app.options('*', cors());

// GLOBAL MIDDLEWARES
// Helmet -- set security HTTP headers
app.use(helmet());

// Morgan -- development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Express-Rate-Limit -- limit requests from some API
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: {
    status: 'fail',
    message: 'Too many requests from this IP 😮. Please try again in an hour.',
  },
});
app.use('/api', limiter);

// Body Parser -- reading data from the body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ limit: '10kb', extended: true }));

// Data Sanitization
// --- against XSS
app.use(xss());

// Compression
app.use(compression());

// Routes
app.get('/', (req, res) => {
  res.send(
    'Hello! Welcome to this simple API on simply getting the News API for your FrontEnd application!'
  );
});

// Errors
// --- unknown routes
app.all('*', (req, res, next) =>
  next(new AppError(`Could not find ${req.originalUrl} on this server!`, 404))
);

// --- global errors
app.use(globalErrorHandler);

module.exports = app;
