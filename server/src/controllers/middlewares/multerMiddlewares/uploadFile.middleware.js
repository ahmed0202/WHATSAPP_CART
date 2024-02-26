const multer = require("multer");
const fs = require("fs"); // this handels uploaded file and save it on server
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (fs.existsSync("./public") == false) {
      fs.mkdirSync("./public");
    }
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const extention = file.originalname.split(".").pop();
    cb(null, uniqueSuffix + "." + extention);
  },
});

const uploadMulterFile = multer({ storage: storage });

module.exports = uploadMulterFile;
