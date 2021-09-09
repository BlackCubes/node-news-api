const sendErrorDev = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      error: err,
      message: `${err.message} 🙅‍♀️`,
      stack: err.stack,
    });
  }
};

const sendErrorProd = (err, req, res) => {
  // API
  if (req.originalUrl.startsWith('/api')) {
    // OPERATIONAL, TRUSTED ERROR: SEND MESSAGE TO CLIENT
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: `${err.message} 🙅‍♀️`,
      });
    }

    // PROGRAMMING OR OTHER UNKNOWN ERROR: DON'T LEAK ERROR DETAILS
    console.error('ERROR!', err);
    return res.status(500).json({
      status: 'error',
      message: 'Something went very wrong! 🙅‍♀️',
    });
  }

  console.error('ERROR!', err);
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';

  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, req, res);
  } else if (process.env.NODE_ENV === 'production') {
    const error = { ...err };
    error.message = err.message;

    sendErrorProd(error, req, res);
  }
};
