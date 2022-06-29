const multer = require("multer");

module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    // The function should call `cb` with a boolean
    // to indicate if the file should be accepted

    // To accept the file pass `true`, like so:
    cb(null, true);
  },
});
