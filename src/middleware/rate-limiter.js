import rateLimit from 'express-rate-limit';

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: 'error',
    message: 'Too many requests. Please try again later.'
  }
});

export const apiRateLimiter = (req, res, next) => {
  if (req.method === 'OPTIONS') {
    return next(); // allow preflight
  }

  return limiter(req, res, next);
};
