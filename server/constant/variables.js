const PORT = process.env.PORT;
const accessTokenExpiry = "20m";
const refreshTokenExpiry = "7d";

const verificationURL = `${process.env.FRONTEND_URL}/verify-email`;

const cookieOption = {
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  maxAge: 15 * 60 * 1000,
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
  httpOnly: process.env.NODE_ENV === "production" ? true : false,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
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
