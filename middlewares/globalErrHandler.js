export const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err?.statusCode ? err.statusCode : 500;
  const stack = err?.stack ? err.stack : null;
  const message = err?.message ? err.message : 'Internal Server Error';

  res.status(statusCode).json({
    stack,
    message,
  });
};

export const websiteNotFound = (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  next(err);
};
