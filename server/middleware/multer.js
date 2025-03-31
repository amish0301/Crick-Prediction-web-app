const multer = require("multer");

const upload = multer({
  storage: multer.memoryStorage(), 
  limits: {
    fileSize: 5 * 1024 * 1024, 
  },
  fileFilter: (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.mimetype)) {
      return cb(new Error("Only JPEG, PNG, and WEBP files are allowed"), false);
    }
    cb(null, true);
  },
});

module.exports = upload