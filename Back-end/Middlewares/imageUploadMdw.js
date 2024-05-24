const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + path.extname(file.originalname));
  },
});

const uploadImage = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == "image/png" ||
      file.mimetype == "image/jpg" ||
      file.mimetype == "image/jpeg"
    ) {
      cb(null, true);
    } else {
      console.log("onlly png & jpg image allowed!");
      cb(null, false);
    }
  },
  limites: {
    fileSize: 1024 * 1024 * 2,
  },
});
module.exports = {
  uploadImage,
};
