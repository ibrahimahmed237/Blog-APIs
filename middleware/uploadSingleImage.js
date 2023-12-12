const multer = require("multer");
const appError = require("../controllers/error.js").appError;
const storage = multer.diskStorage({
  filename: function (req, file, cb) {
    cb(null,file.originalname);
  },
});

const imageFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/i)) {
    return cb(new appError("Allow only jpeg, jpg and png", 400), false);
  }
  cb(null, true);
};
module.exports = multer({
  storage: storage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 3000000,
  },
}).single("image");


