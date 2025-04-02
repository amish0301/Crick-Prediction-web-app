const PORT = process.env.PORT;
const accessTokenExpiry = "30m";
const refreshTokenExpiry = "7d";

const verificationURL = `${process.env.FRONTEND_URL}/verify-email`;
const isProduction = process.env.NODE_ENV === "production"

const cookieOption = {
  secure: isProduction, // Must be false for local development (localhost HTTP)
  sameSite: isProduction ? "none" : "lax", // Use "none" if frontend and backend have different origins
  httpOnly: true, // Prevents access from JavaScript (good for security)
  maxAge: 15 * 60 * 1000, // 15 minutes expiration
};

const sessionOption = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", 
    httpOnly: process.env.NODE_ENV === "production" ? true : false, 
  }
};

const refreshTokenCookieOption = {
  secure: isProduction,
  sameSite: isProduction ? "none" : "lax",
  httpOnly: true,
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days for refresh token
};

module.exports = {
  PORT,
  accessTokenExpiry,
  verificationURL,
  cookieOption,
  refreshTokenExpiry,
  refreshTokenCookieOption,
  sessionOption
};
