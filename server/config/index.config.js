const corsOption = {
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // Ensure this is set in your .env file
  credentials: true, // Allow sending cookies and authorization headers
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // Specify allowed methods
  allowedHeaders: ["Content-Type", "Authorization"], // Allow specific headers
};

module.exports = corsOption;