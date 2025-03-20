import rateLimit from "express-rate-limit";

// Rate limiting for login endpoint
const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: "Too many login attempts, please try again after 15 minutes",
});

// Apply rate limiter to the login route
app.post("/auth/login", loginRateLimiter, login);
