const nodemailer = require("nodemailer");

async function createTransporter() {
  if (process.env.NODE_ENV === "development") {
    const testAccount = await nodemailer.createTestAccount();

    console.log(`✅ Ethereal Test Account Created`);
    console.log(`📩 Email: ${testAccount.user}`);
    console.log(`🔑 Password: ${testAccount.pass}`);

    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } else {
    return nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.CLIENT_EMAIL,
        pass: process.env.CLIENT_EMAIL_PASSWORD,
      },
    });
  }
}

// Export a Promise that resolves to the transporter
module.exports = createTransporter();
