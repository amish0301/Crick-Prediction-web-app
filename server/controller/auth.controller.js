const {
  accessTokenExpiry,
  cookieOption,
  refreshTokenCookieOption,
} = require("../constant/variables");
const db = require("../models");
const ApiError = require("../utils/ApiError");
const TryCatch = require("../utils/TryCatch");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationLink, generateTokens } = require("../utils/utils");
const { googleClient } = require("../utils/utils");

const register = TryCatch(async (req, res, next) => {
  // data from body
  const { name, age, email, password } = req.data;

  // hash passowrd
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user instance in db
  const user = await db.user.create({
    name,
    email,
    age,
    password: hashedPassword,
  });

  if (!user) return next(new ApiError(500, "User Creation Failed"));

  // generate a Verification token
  const accessToken = jwt.sign({ id: user.id, email }, process.env.JWT_SECRET, {
    expiresIn: accessTokenExpiry,
  });

  // send verification link to user on given mail
  const emailRes = await sendVerificationLink(email, accessToken);
  if (!emailRes.success) return next(new ApiError(500, emailRes.message));

  return res
    .status(200)
    .json({ success: emailRes.success, message: emailRes.message });
});

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // find user in db
  const user = await db.user.findOne({ email });
  if (!user)
    return next(new ApiError(404, "User Doesn't Exist with this Email!"));

  // if user exist verify password
  const isMatchPassword = await bcrypt.compare(password, user.password);
  if (!isMatchPassword)
    return next(new ApiError(400, "Credentials are Invalid"));

  // if matched allow access & generate tokens
  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    role: user.role,
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOption)
    .json({
      success: true,
      message: `Welcome Back ${user.name}`,
      accessToken,
      user, 
    });
});

const verifyEmail = TryCatch(async (req, res, next) => {
  const { token } = req.query;
  if (!token) return next(new ApiError(400, "Invalid Token"));

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) return next(new ApiError(404, "Token Expired!"));

  const user = await db.user.findByPk(decoded.id);
  if (user.isVerified)
    return next(new ApiError(402, "User is Already Verified"));

  // mark user as verified
  user.isVerified = true;
  await user.save();

  // generate new Fresh Tokens
  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    role: user.role,
  });

  return res
    .status(200)
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOption)
    .json({
      success: true,
      message: "Email verified successfully!",
      user,
      accessToken,
    });
});

const isVerified = TryCatch(async (req, res, next) => {
  const { email } = req.query;
  const user = await db.user.findOne({ email });

  if (!user) return next(new ApiError(404, "User Not Found"));

  return res.status(200).json({ success: true, isVerified: user.isVerified });
});

// Google Oauth Controller
const googleOAuthHandler = TryCatch(async (req, res, next) => {
  const { code } = req.query;

  const { tokens } = await googleClient.getToken({
    code,
    redirect_uri: process.env.GOOGLE_SUCCESS_REDIRECT,
  });
  googleClient.setCredentials(tokens);

  const userInfoClient = googleClient;
  const userinfo = await userInfoClient.request({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
  });

  const { name, email, picture } = userinfo.data;

  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Google account does not have an email.",
    });
  }

  // Migrate USER DB
  const [user, created] = await db.user.findOrCreate({
    where: { email },
    defaults: {
      name,
      email,
      avatar: picture,
      isGoogleUser: true,
    },
  });

  // generate tokens
  const { accessToken, refreshToken } = generateTokens({
    id: user.id,
    email: user.email,
  });

  res
    .cookie("accessToken", accessToken, cookieOption)
    .cookie("refreshToken", refreshToken, refreshTokenCookieOption);

  req.session.user = {
    id: user.id,
    email: user.email,
    name: user.name,
    avatar: user.avatar,
  };

  return res.redirect(
    `${
      process.env.GOOGLE_FRONTEND_SUCCESS_REDIRECT
    }?accessToken=${accessToken}&user=${encodeURIComponent(
      JSON.stringify(user)
    )}`
  );
});

// Refresh Access Token
const refreshAccessToken = TryCatch(async (req, res, next) => {
  const incomingRefreshToken =
    req.cookies?.refreshToken || req.body?.refreshToken;

  const decoded = jwt.verify(incomingRefreshToken, process.env.JWT_SECRET);

  const user = await db.user.findByPk(decoded.id);
  if (!user) {
    return next(
      new ApiError(401, "Invalid refresh token or Expired refresh token")
    );
  }

  const { accessToken, refreshToken: newRefreshToken } = await generateTokens({
    id: user.id,
  });

  if (!accessToken || !newRefreshToken)
    return next(new ApiError("Token Generation Failed", 500));

  return res
    .status(200)
    .cookie(process.env.AUTH_TOKEN, accessToken, cookieOption)
    .cookie("refreshToken", newRefreshToken, cookieOption)
    .json({
      success: true,
      message: "Access token refreshed",
      accessToken,
    });
});

// module.exports = {login}
module.exports = {
  register,
  login,
  verifyEmail,
  googleOAuthHandler,
  isVerified,
  refreshAccessToken,
};
