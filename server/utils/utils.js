const {
  verificationURL,
  accessTokenExpiry,
  refreshTokenExpiry,
} = require("../constant/variables");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const sendVerificationLink = async (email, verificationToken) => {
  try {
    const verificationLink = `${verificationURL}?token=${verificationToken}`;

    const transporter = await require("./nodemailer"); // calling nodemailer
    const sendmail = await transporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: email,
      subject: "Verify your Account on CrickPrediction",
      html: `<p>Click the link to verify your email: <a href="${verificationLink}">Verify Account</a></p>`,
    });

    if (!sendmail)
      return {
        success: false,
        message: "Something went wrong while sending mail",
      };

    return { success: true, message: "Verification email sent!" };
  } catch (error) {
    console.log("In /utils/sendVerificationLink \n", error);
  }
};

const generateTokens = (payload) => {
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: accessTokenExpiry || "15m",
  });
  const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: refreshTokenExpiry || "7d",
  });

  return { accessToken: accessToken, refreshToken: refreshToken };
};

module.exports = { sendVerificationLink, generateTokens };
