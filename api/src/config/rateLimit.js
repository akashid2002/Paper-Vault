import rateLimit from "express-rate-limit";

// Global limiter (basic protection)
export const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300, // max 300 requests per IP
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    message: "Too many requests from this IP. Please try again later.",
  },
});

// Upload limiter (strict)
export const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // only 20 uploads per hour per IP
  message: {
    message: "Too many uploads. Please try again later.",
  },
});

// Admin limiter (very strict)
export const adminLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, // only 100 admin requests per 15 minutes per IP
  message: {
    message: "Too many admin requests. Slow down.",
  },
});
