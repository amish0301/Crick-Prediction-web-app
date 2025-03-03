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

  return res.status(200).json({
    success: true,
    message:
      "Registration successful! Please check your email for verification.",
  });
});

const login = TryCatch(async (req, res, next) => {
  const { email, password } = req.body;

  // find user in db
  const user = await db.user.findOne({ email: email });
  if (!user)
    return next(new ApiError(404, "User Doesn't Exist with this Email!"));

  // if user exist verify password
  const isMatchPassword = bcrypt.compare(password, user.password);
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

  return res
    .status(200)
    .cookie(process.env.AUTH_TOKEN, token, cookieOption)
    .json({
      success: true,
      message: "Email verified successfully!",
      user,
      accessToken: token,
    });
});

// for refreshing access token

// module.exports = {login}
module.exports = { register, login, verifyEmail };
