const {
  verificationURL,
  accessTokenExpiry,
  refreshTokenExpiry,
} = require("../constant/variables");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const nodemailer = require("nodemailer");
const path = require("path");
const fs = require("fs");

const sendVerificationLink = async (email, verificationToken) => {
  try {
    const verificationLink = `${verificationURL}?token=${verificationToken}`;

    const transporter = await require("./nodemailer"); // calling nodemailer
    const sendmail = await transporter.sendMail({
      from: process.env.CLIENT_EMAIL,
      to: email,
      subject: "Verify your Account on CrickPrediction",
      html: getEmailTemplate(verificationLink),
    });

    console.log("Preview", nodemailer.getTestMessageUrl(sendmail));

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

// init Google OAuth Client
const googleClient = new OAuth2Client({
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
});

// Email Template
const getEmailTemplate = (verificationLink) => {
  let templatePath = path.join(__dirname, "emailTemplate.html");
  let emailHTML = fs.readFileSync(templatePath, "utf8");

  return emailHTML.replace("{verificationLink}", verificationLink);
};

module.exports = {
  sendVerificationLink,
  generateTokens,
  googleClient,
  getEmailTemplate,
};
